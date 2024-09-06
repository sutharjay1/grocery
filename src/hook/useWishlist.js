import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useWishlist = create()(
  persist(
    (set) => ({
      items: [],
      addToWishlist: (product) =>
        set((state) => {
          return { items: [...state.items, { product }] };
        }),
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
