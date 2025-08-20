import axiosInstance from "@/apis/axiosInstance";
import type { LoginPayload } from "@/types/user";

export async function login({ loginId, password }: LoginPayload) {
  const res = await axiosInstance.post("/auth/login", { loginId, password });
  const accessToken =
    res.headers["authorization"]?.replace(/^Bearer\s+/i, "") ?? "";
  const refreshToken = res.headers["x-refresh-token"] ?? "";

  return {
    user: res.data?.user ?? null,
    accessToken,
    refreshToken,
  };
}

export const logout = async () => {
  const { data } = await axiosInstance.post("/auth/logout");
  return data;
};
