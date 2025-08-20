export type TradeStatus = "MATCHED" | "COMPLETED" | "CANCELED";

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
