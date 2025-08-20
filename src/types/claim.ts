import type { ShareItem } from "./share";
import type { Store } from "./store";
import type { WishItem } from "./wish";

export type ClaimStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED";

export interface ClaimItem {
  claimId: number;
  tradeId: number;
  status: ClaimStatus;
  regDate: string;
  wish: WishItem;
  store: Store;
  share?: ShareItem;
  distanceKm?: number;
}

export interface ClaimAccept {
  claimId: number;
  wishId: number;
  shareId: number;
  requesterStoreId: number;
  quantity: number;
  status: ClaimStatus;
  claimAt: string;
  decideAt: string;
}
