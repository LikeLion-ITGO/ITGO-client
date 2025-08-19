import React from "react";

type TimeInputProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean; // ✅ 추가
};

function toDigits(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 4);
}

function formatWithColon(digits: string): string {
  if (digits.length <= 2) return digits; // "H" | "HH"
  return digits.slice(0, 2) + ":" + digits.slice(2, 4); // "HH:mm"
}

function isValidPartial(digits: string): boolean {
  // 입력 중간 단계에서도 유효하지 않으면 false
  if (digits.length >= 1 && Number(digits[0]) > 2) return false; // h1: 0~2
  if (digits.length >= 2) {
    const hh = Number(digits.slice(0, 2)); // 00~23
    if (hh > 23) return false;
  }
  if (digits.length >= 3 && Number(digits[2]) > 5) return false; // m1: 0~5
  if (digits.length === 4) {
    const mm = Number(digits.slice(2, 4)); // 00~59
    if (mm > 59) return false;
  }
  return true;
}

export function TimeInput({
  value,
  onChange,
  className,
  placeholder = "00:00",
  disabled = false,
}: TimeInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = toDigits(e.target.value);
    if (!isValidPartial(digits)) return;

    const next = formatWithColon(digits);
    onChange(next);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = toDigits(e.clipboardData.getData("text"));
    if (!isValidPartial(pasted)) return;

    const next = formatWithColon(pasted);
    onChange(next);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      autoComplete="off"
      maxLength={5} // "HH:mm"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      onPaste={handlePaste}
      placeholder={placeholder}
      className={className}
      aria-label="time"
    />
  );
}
