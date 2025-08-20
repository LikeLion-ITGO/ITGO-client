import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLoggedIn: boolean;
  setLogin: () => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
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
