// src/apis/wish.ts
import axiosInstance from "@/apis/axiosInstance";
import type { PageData } from "@/types/api";
import type {
  PresignRequestItem,
  PresignResponseItem,
  RecieveRegisterRequest,
  ShareDetail,
  ShareItem,
} from "@/types/share";

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

// 1) 메타데이터 생성
export async function createShare(body: RecieveRegisterRequest) {
  const { data } = await axiosInstance.post("/share", body);
  return data;
}
// 2) presign 발급
export async function presignShareImages(
  shareId: number,
  items: PresignRequestItem[]
) {
  const { data } = await axiosInstance.post<{
    shareId: number;
    items: PresignResponseItem[];
  }>(`/share-image/presign/${shareId}`, { items, seqsValid: true });
  return data.items;
}

// 3) S3 PUT 업로드 (presigned URL 사용: 인증 헤더 x)
export async function putToS3(putUrl: string, file: File, contentType: string) {
  const res = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
    cache: "no-store",
    // mode: "cors" // 기본이 cors라 생략 가능
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`S3 PUT failed: ${res.status} ${text}`);
  }
}

// 4) 업로드 확정(커밋)
export async function confirmShareImages(
  shareId: number,
  items: { seq: number; objectKey: string }[]
) {
  const { data } = await axiosInstance.post<ShareDetail>(
    "/share-image/confirm",
    {
      shareId,
      items,
      seqsValid: true,
    }
  );
  return data;
}
