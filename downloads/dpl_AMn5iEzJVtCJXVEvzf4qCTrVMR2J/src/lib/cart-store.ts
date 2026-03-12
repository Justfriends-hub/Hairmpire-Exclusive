'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product } from './types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, selectedLength: string, selectedColor: string) => void
  removeItem: (productId: string, selectedLength: string, selectedColor: string) => void
  updateQuantity: (productId: string, selectedLength: string, selectedColor: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, selectedLength, selectedColor) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedLength === selectedLength &&
              item.selectedColor === selectedColor
          )
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedLength === selectedLength &&
                item.selectedColor === selectedColor
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, { product, quantity: 1, selectedLength, selectedColor }],
          }
        })
      },
      
      removeItem: (productId, selectedLength, selectedColor) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId &&
                item.selectedLength === selectedLength &&
                item.selectedColor === selectedColor)
          ),
        }))
      },
      
      updateQuantity: (productId, selectedLength, selectedColor, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedLength === selectedLength &&
            item.selectedColor === selectedColor
              ? { ...item, quantity: Math.max(0, quantity) }
              : item
          ).filter((item) => item.quantity > 0),
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
      
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'luxehair-cart',
    }
  )
)
