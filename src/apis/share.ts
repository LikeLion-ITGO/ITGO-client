// src/apis/wish.ts
import axiosInstance from "@/apis/axiosInstance";
import type { PageData } from "@/types/api";
import type { ShareItem } from "@/types/share";

/**
 * wish 목록 페이지네이션
 * @param page 0-based
 * @param size 페이지 크기 (기본 20)
 */

export async function fetchSharePage(page: number, size = 20) {
  const res = await axiosInstance.get<PageData<ShareItem>>("/share", {
    params: { page, size },
  });

  const pageData = res.data;
  return {
    ...pageData,
    page,
  };
}
