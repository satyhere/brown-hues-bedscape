import { useState, useEffect } from 'react'
import { supabase } from '../integrations/supabase/client'
import { CartItem } from '../types/bed'

export type Cart = {
  items: CartItem[]
  total: number
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(i => 
        i.id === item.id && i.size === item.size && i.treatment === item.treatment
      )

      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(i =>
            i.id === item.id && i.size === item.size && i.treatment === item.treatment
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
          total: prevCart.total + (item.price * item.quantity)
        }
      }

      return {
        ...prevCart,
        items: [...prevCart.items, item],
        total: prevCart.total + (item.price * item.quantity)
      }
    })
  }

  const removeFromCart = (itemId: string, size?: string, treatment?: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => 
        i.id === itemId && i.size === size && i.treatment === treatment
      )
      
      if (!item) return prevCart

      return {
        ...prevCart,
        items: prevCart.items.filter(i => 
          !(i.id === itemId && i.size === size && i.treatment === treatment)
        ),
        total: prevCart.total - (item.price * item.quantity)
      }
    })
  }

  const updateQuantity = (itemId: string, quantity: number, size?: string, treatment?: string) => {
    setCart(prevCart => {
      const item = prevCart.items.find(i => 
        i.id === itemId && i.size === size && i.treatment === treatment
      )
      
      if (!item) return prevCart

      const quantityDiff = quantity - item.quantity

      return {
        ...prevCart,
        items: prevCart.items.map(i =>
          i.id === itemId && i.size === size && i.treatment === treatment
            ? { ...i, quantity }
            : i
        ),
        total: prevCart.total + (item.price * quantityDiff)
      }
    })
  }

  const clearCart = () => {
    setCart({ items: [], total: 0 })
  }

  const submitOrder = async (customerInfo: any) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            items: cart.items,
            total: cart.total,
            customer_info: customerInfo,
            status: 'pending'
          }
        ])
        .select()

      if (error) throw error

      clearCart()
      return data
    } catch (error) {
      console.error('Error submitting order:', error)
      throw error
    }
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    submitOrder
  }
} 