import type { CreateStoreReq, Store, UpdateStoreReq } from "@/types/store";
import axiosInstance from "./axiosInstance";
import type { ApiResponse } from "@/types/api";

export async function getMyStore() {
  const res = await axiosInstance.get<ApiResponse<Store>>("/store/me");
  return res.data.data;
}

export async function createStore(payload: CreateStoreReq): Promise<{
  storeId: number;
}> {
  const { data } = await axiosInstance.post("/store", payload);
  return data.data;
}

export async function presignStoreImageDraft(body: {
  ext: string;
  contentType: string;
  sizeBytes: number;
}) {
  const { data } = await axiosInstance.post("/store-image/draft/presign", body);
  return data.data;
}

export async function uploadToS3(putUrl: string, file: File): Promise<void> {
  const res = await fetch(putUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: file,
  });
  if (!res.ok)
    throw new Error(`S3 업로드 실패: ${res.status} ${res.statusText}`);
}

// 가게 정보 수정
export async function updateStore(payload: UpdateStoreReq): Promise<Store> {
  const { data } = await axiosInstance.put<ApiResponse<Store>>(
    "/store",
    payload
  );
  return data.data;
}

// 가게 정보 조회
export async function getStoreById(storeId: number): Promise<Store> {
  const { data } = await axiosInstance.get<ApiResponse<Store>>(
    `/store/${storeId}`
  );
  return data.data;
}
