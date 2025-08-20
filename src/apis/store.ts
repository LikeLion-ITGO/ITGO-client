import type { Store } from "@/types/store";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";

export async function getMyStore() {
  const res = await axiosInstance.get<ApiResponse<Store>>("/store/me");
  return res.data.data;
}
