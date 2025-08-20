export interface ShareItem {
  shareId: number;
  itemName: string;
  brand: string;
  quantity: number;
  expirationDate: string;
  openTime: string;
  closeTime: string;
  description: string;
  regDate: string; // ISO string
  primaryImageUrl: string;
  claimTotalCount: number;
}
