import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/stores/user";

export const ProtectedRoute = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
