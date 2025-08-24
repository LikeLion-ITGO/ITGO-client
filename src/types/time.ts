export type LocalTime = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export const formatLocalTime = (t?: string | LocalTime) => {
  if (!t) return "";
  if (typeof t === "string") {
    const [h = "00", m = "00"] = t.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  }
  const hh = String(t.hour).padStart(2, "0");
  const mm = String(t.minute).padStart(2, "0");
  return `${hh}:${mm}`;
};

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  if (weeks < 5) return `${weeks}주 전`;
  if (months < 12) return `${months}달 전`;
  return `${years}년 전`;
}
