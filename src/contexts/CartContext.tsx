import React, { createContext, useContext, ReactNode, useState } from 'react'
import { useCart, Cart } from '../hooks/useCart'
import { CartItem } from '../types/bed'

type CartContextType = {
  cart: Cart
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string, size?: string, treatment?: string) => void
  updateQuantity: (itemId: string, quantity: number, size?: string, treatment?: string) => void
  clearCart: () => void
  submitOrder: (customerInfo: {
    name: string
    email: string
    phone: string
    address: string
    notes?: string
  }) => Promise<any>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const cartState = useCart()

  const openCart = () => {
    setIsCartOpen(true)
    document.body.style.overflow = 'hidden' // Prevent scrolling when cart is open
  }

  const closeCart = () => {
    setIsCartOpen(false)
    document.body.style.overflow = 'auto' // Re-enable scrolling
  }

  const toggleCart = () => {
    setIsCartOpen(prev => {
      const newState = !prev
      document.body.style.overflow = newState ? 'hidden' : 'auto'
      return newState
    })
  }

  const contextValue = {
    ...cartState,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}