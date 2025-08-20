export interface TradeParty {
  storeId: number;
  storeImageUrl: string | null;
  storeName: string;
  roadAddress: string;
  openTime: string; // "18:00:00"
  closeTime: string; // "18:00:00"
  phoneNumber: string;
}

export type TradeStatus = "MATCHED" | "COMPLETED" | "CANCELED";

export interface TradeDetail {
  tradeId: number;
  primaryImageUrl: string | null;
  itemName: string;
  brand: string;
  quantity: number;
  expirationDate: string; // "YYYY-MM-DD"
  giver: TradeParty;
  receiver: TradeParty;
  status: TradeStatus;
  matchedAt: string; // ISO
  completedAt: string | null;
}

export interface TradeItem {
  tradeId: number;
  status: TradeStatus;
  brand: string;
  itemName: string;
  openTime: string;
  closeTime: string;
  expirationDate: string;
  wishQuantity: number;
  distanceKm: number;
  giverRoadAddress?: string;
  giverOpenTime?: string;
  giverCloseTime?: string;
  giverPhoneNumber?: string;
  receiverRoadAddress?: string;
  receiverOpenTime?: string;
  receiverCloseTime?: string;
  receiverPhoneNumber?: string;

}
