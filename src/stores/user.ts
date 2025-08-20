import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      setLogin: () => set({ isLoggedIn: true }),
      setLogout: () => set({ isLoggedIn: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
