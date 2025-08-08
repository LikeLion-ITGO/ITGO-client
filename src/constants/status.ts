export enum GiveShareStatus {
  NO_REQUEST = "NO_REQUEST", // 나눔 관련 아무 일도 없음
  RECEIVED_REQUEST = "RECEIVED_REQUEST", // 누군가 나에게 나눔을 요청함
  MATCHING_IN_PROGRESS = "MATCHING_IN_PROGRESS", // 나눔 요청을 검토 중 or 수락 중
  SHARING_CONFIRMED = "SHARING_CONFIRMED", // 요청을 수락하고 나눔 매칭이 완료됨
}

export enum ReceiveShareStatus {
  NO_REQUEST = "NO_REQUEST", // 나눔 요청을 한 적 없음
  MATCHING_IN_PROGRESS = "MATCHING_IN_PROGRESS", // 나눔 요청을 보낸 상태 (수락 기다리는 중)
  SHARING_CONFIRMED = "SHARING_CONFIRMED", // 요청이 수락되어 매칭 완료됨
}

export enum ProductStatus {
  NO_REQUEST = "NO_REQUEST", // 나눔 요청을 받지 못함
  MATCHED = "MATCHED", // 나눔 요청을 받음 (confirm 이전)
  CONFIRMED = "CONFIRMED", // 나눔이 진행된 이후 confirm 완료
}
