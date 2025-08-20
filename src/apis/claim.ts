// src/apis/wish.ts
import axiosInstance from "@/apis/axiosInstance";
import type { ApiResponse, PageData } from "@/types/api";
import type { ClaimItem } from "@/types/claim";

/**
 * wish 목록 페이지네이션
 * @param page 0-based
 * @param size 페이지 크기 (기본 20)
 */

export async function fetchReceivedClaims(
  shareId: number,
  page: number,
  size = 10
) {
  const res = await axiosInstance.get<ApiResponse<PageData<ClaimItem>>>(
    `/claim/received/${shareId}`,
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

export async function fetchSentClaims(wishId: number, page: number, size = 10) {
  const res = await axiosInstance.get<ApiResponse<PageData<ClaimItem>>>(
    `/claim/sent/${wishId}`,
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

export async function acceptClaim(claimId: number) {
  const res = await axiosInstance.post(`/claim/accept/${claimId}`);
  return res.data;
}
