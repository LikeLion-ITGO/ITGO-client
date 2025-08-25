// src/apis/wish.ts
import axiosInstance from "@/apis/axiosInstance";

import type {
  PresignRequestItem,
  PresignResponseItem,
  QuickClaimReq,
  QuickClaimRes,
  ShareCreateReq,
  ShareDetail,
  ShareDetailApi,
  ShareImage,
  SharePageResp,
  ShareResponse,
} from "@/types/share";

/**
 * wish 목록 페이지네이션
 * @param page 0-based
 * @param size 페이지 크기 (기본 20)
 */

export async function fetchSharePage(
  page: number,
  size = 20
): Promise<SharePageResp> {
  const res = await axiosInstance.get<SharePageResp>("/share", {
    params: { page, size },
  });
  return res.data; // ✅ { code, message, data: { content, number, last, ... } }
}

//ShareList용....
export async function fetchShareList(
  page: number,
  size = 20
): Promise<{ content: ShareResponse[] }> {
  const { data } = await axiosInstance.get(`/share`, {
    params: { page, size },
  });

  const content = Array.isArray(data?.data?.content)
    ? data.data.content
    : Array.isArray(data?.content)
    ? data.content
    : [];

  return { content };
}
//

// 1 여러 장 draft presign
export async function presignShareImageDrafts(
  items: PresignRequestItem[]
): Promise<PresignResponseItem[]> {
  const { data } = await axiosInstance.post<{
    data: { memberId: number; items: PresignResponseItem[] };
  }>("/share-image/draft/presign", { items, seqsValid: true });

  return data.data.items ?? [];
}

// 2 S3 PUT 업로드 (인증 헤더 X)
export async function putToS3(putUrl: string, file: File, contentType: string) {
  const res = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
    cache: "no-store",
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`S3 PUT failed: ${res.status} ${msg}`);
  }
}

// 3 나눔 등록 (draftKey만 보냄)
export async function createShare(body: ShareCreateReq) {
  const { data } = await axiosInstance.post<{ data: ShareDetail }>(
    "/share",
    body
  );
  return data.data;
}

///////////

// 가게 정보 조회
export async function getShareById(shareId: number): Promise<ShareDetail> {
  const { data } = await axiosInstance.get<{ data: ShareDetailApi }>(
    `/share/${shareId}`
  );
  const raw = data.data;

  const images: ShareImage[] = Array.isArray(raw.images)
    ? raw.images
    : raw.images
    ? [raw.images]
    : [];

  return {
    ...raw,
    images,
  } as ShareDetail;
}

export async function updateShare(shareId: number, body: ShareCreateReq) {
  const { data } = await axiosInstance.put(`/share/${shareId}`, body);
  return data;
}

//삭제
export const deleteShare = async (shareId: number) => {
  const res = await axiosInstance.delete(`/share/${shareId}`);
  return res.data;
};

export async function fetchShareDongList(
  page: number,
  size = 20
): Promise<{ content: ShareResponse[] }> {
  const { data } = await axiosInstance.get(`/share/dong`, {
    params: { page, size },
  });

  const content = Array.isArray(data?.data?.content)
    ? data.data.content
    : Array.isArray(data?.content)
    ? data.content
    : [];

  return { content };
}

// 빠른요청

export async function claimQuick(body: QuickClaimReq) {
  const { data } = await axiosInstance.post<{ data: QuickClaimRes }>(
    "/claim/quick",
    body
  );
  return data.data;
}
