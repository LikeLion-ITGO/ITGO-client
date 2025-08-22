export interface Store {
  id?: number;
  storeId: number;
  storeName: string;
  address: Address;
  openTime: string; // "09:00"
  closeTime: string; // "18:00"
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
};
