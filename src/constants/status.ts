export enum ShareStatus {
  NO_REQUEST = "NO_REQUEST",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
}

export enum ProductStatus {
  NO_REQUEST = "NO_REQUEST", // 나눔 요청을 받지 못함
  MATCHED = "MATCHED", // 나눔 요청을 받음 (confirm 이전)
  CONFIRMED = "CONFIRMED", // 나눔이 진행된 이후 confirm 완료
}
