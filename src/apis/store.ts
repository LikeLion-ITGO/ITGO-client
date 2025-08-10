import type { Store } from "@/types/store";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";

const BASE = "/api/v1/store"; // 상대 경로

/** 내 가게 조회 */
export async function getMyStore() {
  const res = await axiosInstance.get<ApiResponse<Store>>(`${BASE}/me`);
  console.log("api 응답값", res.data);
  console.log("실제 요청 데이터", res.data);
  return res.data.data;
}
