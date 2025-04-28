import React, { createContext, useContext, ReactNode } from 'react'
import { useCart, Cart, CartItem } from '../hooks/useCart'

type CartContextType = {
  cart: Cart
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
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
  const cartState = useCart()

  return (
    <CartContext.Provider value={cartState}>
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