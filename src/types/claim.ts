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
}
