// src/types/kakao-address.d.ts
export type KakaoStatus = "OK" | "ZERO_RESULT" | "ERROR";

/** 지번 주소 */
export interface KakaoJibunAddress {
  address_name: string; // "서울 노원구 공릉동 661-13"
  b_code?: string; // 법정동 코드
  h_code?: string; // 행정동 코드
  main_address_no?: string;
  sub_address_no?: string;
  mountain_yn?: "Y" | "N";
  region_1depth_name?: string;
  region_2depth_name?: string;
  region_3depth_name?: string;
  x?: string; // 경도(지번 객체에도 있을 수 있음)
  y?: string; // 위도
}

/** 도로명 주소 */
export interface KakaoRoadAddress {
  address_name: string; // "서울 노원구 공릉로 97"
  building_name?: string;
  main_building_no?: string; // "97"
  sub_building_no?: string;
  region_1depth_name?: string;
  region_2depth_name?: string;
  region_3depth_name?: string;
  road_name?: string;
  underground_yn?: "Y" | "N";
  zone_no?: string; // 우편번호
}

/** addressSearch 결과 단건 */
export interface KakaoAddressSearchResultItem {
  address?: KakaoJibunAddress | null; // 지번 주소 객체
  road_address?: KakaoRoadAddress | null; // 도로명 주소 객체
  address_name?: string; // 결과의 대표 주소명 (문자열)
  address_type?: string; // "ROAD_ADDR" 등
  x: string; // 경도
  y: string; // 위도
}

/** addressSearch 결과 배열 */
export type KakaoAddressSearchResult = KakaoAddressSearchResultItem[];
