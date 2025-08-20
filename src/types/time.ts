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
