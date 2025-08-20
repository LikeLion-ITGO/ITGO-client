// src/apis/wish.ts
import axiosInstance from "@/apis/axiosInstance";
import type { ApiResponse, PageData } from "@/types/api";
import type {
  WishCreateAndMatchResponse,
  WishItem,
  WishUpsertRequest,
} from "@/types/wish";

/**
 * wish 목록 페이지네이션
 * @param page 0-based
 * @param size 페이지 크기 (기본 20)
 */

export async function fetchWishPage(page: number, size = 20) {
  const res = await axiosInstance.get<ApiResponse<PageData<WishItem>>>(
    "/wish",
    {
      params: { page, size },
    }
  );

  const pageData = res.data.data;
  return {
    ...pageData,
    page,
  };
}

export const postWishMatch = (
  payload: WishUpsertRequest,
  params?: { radiusKm?: number; size?: number }
) =>
  axiosInstance.post<WishCreateAndMatchResponse>("/wish/match", payload, {
    params: { radiusKm: params?.radiusKm ?? 3, size: params?.size ?? 10 },
  });
