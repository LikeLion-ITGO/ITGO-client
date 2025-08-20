import type { LocalTime } from "./time";

export interface WishItem {
  wishId: number;
  title: string;
  itemName: string;
  brand: string;
  quantity: number;
  description: string;
  regDate: string; // ISO string
  claimTotalCount: number;
}

export type WishUpsertRequest = {
  title: string;
  itemName: string;
  brand?: string;
  quantity: number; // -> 이거 어떻게 할지.... 나중에 수정할 듯??/? --> 고기
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
