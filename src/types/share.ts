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

//ShareList용...
export interface ShareResponse {
  shareId: number;
  itemName: string;
  brand?: string;
  quantity: number;
  expirationDate: string;
  freshCertified: boolean;
  openTime: string;
  closeTime: string;
  regDate: string;
  primaryImageUrl?: string;
  claimTotalCount: number;
}
//
