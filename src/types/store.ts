export interface Store {
  id: number;
  name: string;
  address: string;
  openAt: string; // "09:00"
  closeAt: string; // "18:00"
  phone?: string;
}
