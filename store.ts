import {create} from "zustand"
import { persist } from 'zustand/middleware';
import { Product } from './sanity.types';  // Product tipini burada import ettik

export interface BasketItem {
  product: Product;
  quantity: number;
}

export interface BasketState {
  items: BasketItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItems: () => BasketItem[];
}

// Zustand store'unu create kullanarak oluşturuyoruz
const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {  // product parametresinin tipi Product olarak belirtildi
        const existingItem = get().items.find(item => item.product._id === product._id);
        if (existingItem) {
          set(state => ({
            items: state.items.map(item =>
              item.product._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { product, quantity: 1 }],
          }));
        }
      },
      removeItem: (productId: string) => {  // productId'nin tipi string olarak belirtildi
        set(state => ({
          items: state.items.reduce((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              }
            } else {
              acc.push(item);
            }
            return acc;
          }, [] as BasketItem[]),
        }));
      },
      clearBasket: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getItemCount: (productId: string) => {  // productId'nin tipi string olarak belirtildi
        const item = get().items.find(item => item.product._id === productId);
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    {
      name: 'basket-store', // LocalStorage için isim
    }
  )
);

export default useBasketStore;
