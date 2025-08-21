import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreIdState = {
  storeId: number | null;
  setStoreId: (id: number | null) => void;
  clearStoreId: () => void;
};

export const useStoreIdStore = create<StoreIdState>()(
  persist(
    (set) => ({
      storeId: null,
      setStoreId: (id) => set({ storeId: id }),
      clearStoreId: () => set({ storeId: null }),
    }),
    {
      name: "store-id-storage", // 로컬스토리지 key
    }
  )
);
