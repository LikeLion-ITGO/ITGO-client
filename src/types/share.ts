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
  primaryImageUrl?: string;
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

export type StorageType = "REFRIGERATED" | "FROZEN" | "ROOM_TEMPERATURE";

export type RecieveRegisterRequest = {
  itemName: string;
  brand?: string;
  quantity: number;
  description?: string;
  expirationDate: string;
  storageType: StorageType;
  freshCertified: boolean;
  openTime: string;
  closeTime: string;
};

export type PresignRequestItem = {
  seq: number; // 0이 대표 이미지
  ext: string; // "jpg" | "png" ...
  contentType: string; // "image/jpeg" ...
  sizeBytes: number;
};
export type PresignResponseItem = {
  seq: number;
  putUrl: string;
  objectKey: string; // shares/{shareId}/images/{seq}.{uuid}.{ext}
  publicUrl: string; // CDN 접근 URL
};

export type ShareImage = {
  seq: number;
  objectKey: string;
  publicUrl: string;
};

export type ShareDetail = {
  shareId: number;
  itemName: string;
  brand: string;
  quantity: number;
  description: string;
  expirationDate: string;
  storageType: "REFRIGERATED" | "FROZEN" | "ROOM_TEMPERATURE";
  freshCertified: boolean;
  openTime: string;
  closeTime: string;
  images: ShareImage[];
  roadAddress: string;
  regDate: string;
};
