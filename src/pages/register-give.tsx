import RegisterLayout from "@/components/layouts/RegisterLayout";
import { GiveRegisterForm } from "@/components/register/GiveRegisterForm";
import { Button } from "@/components/ui/button";
import Camera from "@/assets/icons/register/camera.svg?react";
import { AIGeneratingModal } from "@/components/register/AiGeneratingModal";
import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

type Preview = { id: string; file: File; url: string };

export const RegisterGive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX = 10;

  // objectURL 메모리 정리
  useEffect(() => {
    return () => images.forEach((p) => URL.revokeObjectURL(p.url));
  }, [images]);

  const openPicker = () => fileInputRef.current?.click();

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remain = MAX - images.length;
    const picked = files.slice(0, Math.max(0, remain));

    const next: Preview[] = picked.map((f) => ({
      id: `${f.name}-${f.size}-${crypto.randomUUID?.() ?? Math.random()}`,
      file: f,
      url: URL.createObjectURL(f),
    }));

    setImages((prev) => [...prev, ...next]);
    // 같은 파일 다시 선택 가능하도록 value 초기화
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };
  return (
    <RegisterLayout header={"나눔 주기"}>
      <div className="flex flex-col px-5 pt-10 gap-16">
        {/* 사진 section */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-2">
            {/* 카메라 버튼 */}
            <button
              type="button"
              onClick={openPicker}
              className="shrink-0 w-[78px] h-[78px] flex flex-col items-center justify-center gap-[6px] text-gray-400 border border-gray-200 rounded-lg"
            >
              <Camera />
              <div className="subhead-02 flex flex-row">
                <span className="text-blue-normal-hover">{images.length}</span>
                <span>/{MAX}</span>
              </div>
            </button>
            <div className="flex flex-row gap-2 overflow-x-auto flex-nowrap pb-1">
              {/* 선택된 사진 썸네일들 */}
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative shrink-0 w-[78px] h-[78px] rounded-lg overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute z-10 top-1 right-1 w-5 h-5 rounded-full bg-gray-700 text-white flex items-center justify-center"
                    aria-label="이미지 삭제"
                  >
                    <X size={12.5} />
                  </button>
                  <img
                    src={img.url}
                    alt="업로드 이미지 미리보기"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 이미지 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            capture="environment" // 모바일: 후면 카메라 우선(브라우저별 동작 상이)
            onChange={onPickFiles}
            className="hidden"
          />
          <Button
            className="w-[162px] h-11 subhead-03 border bg-white text-blue-normal border-blue-normal hover:bg-gray-100 rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            AI로 작성하기
          </Button>
        </div>
        {/* 입력폼 */}
        <GiveRegisterForm />
      </div>
      <AIGeneratingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </RegisterLayout>
  );
};
