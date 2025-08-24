export interface Store {
  id?: number;
  storeId: number;
  storeName: string;
  address: Address;
  openTime: string;
  closeTime: string;
  phoneNumber?: string;
  name?: string;
  storeImageUrl?: string;
  description?: string;
  giveTimes?: number;
  receivedTimes?: number;
}

export interface Address {
  dong: string;
  latitude: number;
  longitude: number;
  roadAddress: string;
}

export type CreateStoreReq = {
  storeName: string;
  address: {
    roadAddress: string;
    dong?: string;
    latitude?: number;
    longitude?: number;
  };
  openTime: string;
  closeTime: string;
  phoneNumber: string;
  description?: string;
  /** 새 스펙: presign(draft)에서 받은 키 */
  imageDraftKey?: string;
};

export type UpdateStoreReq = {
  storeName: string;
  address: {
    roadAddress: string;
    dong?: string;
    latitude?: number;
    longitude?: number;
  };
  openTime: string;
  closeTime: string;
  phoneNumber: string;
  description: string;
  imageDraftKey?: string;
};

/** presign(draft) */
export type StoreImageDraftReq = {
  ext: string; // "jpg" | "png" ...
  contentType: string; // "image/jpeg" ...
  sizeBytes: number;
};
export type StoreImageDraftItem = {
  seq: number; // 단건이면 0
  putUrl: string;
  previewUrl: string; // 업로드 후 접근될 URL
  draftKey: string; // <-- 이걸 createStore에 넣음
};
