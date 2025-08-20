import axiosInstance from "./axiosInstance";
import type { TradeDetail } from "@/types/trade";

export async function getTradeDetail(tradeId: number): Promise<TradeDetail> {
  const res = await axiosInstance.get(`/trade/${tradeId}`);
  return res.data.data as TradeDetail;
}

export async function completeTrade(tradeId: number) {
  return axiosInstance.post(`/trade/complete/${tradeId}`);
}

export async function cancelTrade(tradeId: number) {
  return axiosInstance.post(`/trade/cancel/${tradeId}`);
}
