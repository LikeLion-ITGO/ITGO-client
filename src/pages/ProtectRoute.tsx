import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth";

export const ProtectedRoute = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
