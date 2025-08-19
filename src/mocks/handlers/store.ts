import { http, HttpResponse } from "msw";
import type { Store } from "@/types/store";
import type { ApiResponse } from "@/types/api";

const BASE = "*/api/v1/store";

const mockStore: Store = {
  id: 1,
  name: "테스트 가게",

  address: {
    roadAddress: "서울 노원구 동일로192길 62 2층",
    dong: "공릉동",
    latitude: 37.6267705,
    longitude: 127.0763917,
  },
  openTime: "09:00",
  closeTime: "18:00",

  phone: "010-1234-5678",
};

// 내 가게 조회
export const getMyStoreHandler = http.get<
  never, // Path params
  ApiResponse<Store> | ApiResponse<null> // Response body
>(`${BASE}/me`, () => {
  if (!mockStore) {
    return HttpResponse.json<ApiResponse<null>>(
      { code: 404, message: "가게가 없습니다.", data: null },
      { status: 404 }
    );
  }
  return HttpResponse.json<ApiResponse<Store>>({
    code: 200,
    message: "성공",
    data: mockStore,
  });
});

export const storeHandlers = [getMyStoreHandler];
