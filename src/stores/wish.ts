import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishIdState = {
  wishId: number | null;
  setWishId: (id: number | null) => void;
  clearWishId: () => void;
};

export const useWishIdStore = create<WishIdState>()(
  persist(
    (set) => ({
      wishId: null,
      setWishId: (id) => set({ wishId: id }),
      clearWishId: () => set({ wishId: null }),
    }),
    {
      name: "wish-id-storage",
    }
  )
);
