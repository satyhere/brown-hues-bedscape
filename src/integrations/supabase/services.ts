import { supabase } from './client'
import type { Database } from './types'

type Order = Database['public']['Tables']['orders']['Insert']
type OrderItem = Database['public']['Tables']['order_items']['Insert']

export const createOrder = async (order: Order, items: Omit<OrderItem, 'order_id'>[]) => {
  try {
    // Start a transaction by creating the order first
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (orderError) throw orderError

    // Then create all order items with the order ID
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return orderData
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export const getOrder = async (orderId: string) => {
  try {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (orderError) throw orderError

    const { data: items, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)

    if (itemsError) throw itemsError

    return {
      ...order,
      items
    }
  } catch (error) {
    console.error('Error fetching order:', error)
    throw error
  }
}

export const updateOrderStatus = async (orderId: string, status: Database['public']['Tables']['orders']['Update']['status']) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
} 