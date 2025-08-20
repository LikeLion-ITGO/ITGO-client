import axiosInstance from "./axiosInstance";
import type { TradeDetail, TradeItem } from "@/types/trade";
import type { ApiResponse, PageData } from "@/types/api";

/**
 * wish 목록 페이지네이션
 * @param page 0-based
 * @param size 페이지 크기 (기본 20)
 */

export async function fetchReceivedTradePage(page: number, size = 20) {
  const res = await axiosInstance.get<ApiResponse<PageData<TradeItem>>>(
    "/trade/received/details",
    {
      params: { page, size },
    }
  );

  const pageData = res.data.data;
  return {
    ...pageData,
    page,
  };
}

export async function fetchSentTradePage(page: number, size = 20) {
  const res = await axiosInstance.get<ApiResponse<PageData<TradeItem>>>(
    "/trade/given/details",
    {
      params: { page, size },
    }
  );

  const pageData = res.data.data;
  return {
    ...pageData,
    page,
  };
}

export async function getTradeDetail(tradeId: number): Promise<TradeDetail> {
  const res = await axiosInstance.get(`/trade/${tradeId}`);
  return res.data.data as TradeDetail;
}

export async function cancelTrade(tradeId: number) {
  return axiosInstance.post(`/trade/cancel/${tradeId}`);
}

export const completeTrade = async (tradeId: number) => {
  const { data } = await axiosInstance.post(`/trade/complete/${tradeId}`);
  return data;
};
