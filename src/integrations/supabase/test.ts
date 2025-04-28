import { supabase } from './client'

export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...')
    
    // Test orders table
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('count')
      .limit(1)

    if (ordersError) {
      console.error('Orders table error:', ordersError)
      return { success: false, error: ordersError.message }
    }

    // Test order_items table
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('count')
      .limit(1)

    if (itemsError) {
      console.error('Order items table error:', itemsError)
      return { success: false, error: itemsError.message }
    }

    console.log('Supabase connection successful!')
    console.log('Orders data:', ordersData)
    console.log('Order items data:', itemsData)
    
    return { 
      success: true, 
      data: {
        orders: ordersData,
        orderItems: itemsData
      }
    }
  } catch (error) {
    console.error('Error testing Supabase connection:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 