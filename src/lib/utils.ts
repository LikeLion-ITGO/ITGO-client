import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getExtAndType(file: File) {
  const type = file.type || "application/octet-stream";

  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/heic": "heic", // iOS 가능성
    "image/heif": "heif",
  };
  const extFromMime = map[type];
  const extFromName = file.name.includes(".")
    ? file.name.split(".").pop()!.toLowerCase()
    : undefined;

  const ext = extFromMime || extFromName || "jpg";
  return { ext, contentType: type };
}
