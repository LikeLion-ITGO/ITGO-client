import axiosInstance from "@/apis/axiosInstance";
import type { LocalTime } from "./time";

export type WishUpsertRequest = {
  title: string;
  itemName: string;
  brand?: string;
  //
  quantity: number; // -> 이거 어떻게 할지.... 나중에 수정할 듯??/? --> 고기
  //
  description?: string;
  openTime: string;
  closeTime: string;
};

export type WishMatchItem = {
  shareId: number;
  itemName: string;
  brand?: string;
  quantity: number; //
  expirationDate: string;
  storageType: "REFRIGERATED" | "FROZEN" | "ROOM_TEMPERATURE" | string;
  openTime: LocalTime | string;
  closeTime: LocalTime | string;
  primaryImageUrl?: string;
  minutesAgo: number;
  distanceKm: number;
};

export type WishCreateAndMatchResponse = {
  code: string;
  message: string;
  data: {
    wishId: number;
    matches: WishMatchItem[];
  };
};

export const postWishMatch = (
  payload: WishUpsertRequest,
  params?: { radiusKm?: number; size?: number }
) =>
  axiosInstance.post<WishCreateAndMatchResponse>("/wish/match", payload, {
    params: { radiusKm: params?.radiusKm ?? 3, size: params?.size ?? 10 },
  });
