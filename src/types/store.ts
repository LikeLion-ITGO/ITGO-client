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
}

export interface Address {
  dong: string;
  latitude: number;
  longitude: number;
  roadAddress: string;
}
