// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCart: (items: CartItem[]) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        const items = get().items;
        const existingItem = items.find(
          (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
        );

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.productId === newItem.productId ? { ...i, quantity: i.quantity + newItem.quantity } : i
            ),
          });
        } else {
          set({ items: [...items, newItem] });
        }
      },
      removeItem: (id) => set({ items: get().items.filter((i) => i.productId !== id) }),
      updateQuantity: (id, qty) =>
        set({
          items: get().items.map((i) => (i.productId === id ? { ...i, quantity: qty } : i)),
        }),
      clearCart: () => set({ items: [] }),
      setCart: (items) => set({ items }),
    }),
    { name: 'flower-fairy-cart' } // localStorage key
  )
);