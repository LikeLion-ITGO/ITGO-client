import type { Store } from "@/types/store";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";

export async function getMyStore() {
  const res = await axiosInstance.get<ApiResponse<Store>>("/store/me");
  console.log("api 응답값", res.data);
  return res.data.data;
}
