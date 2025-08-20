import RegisterLayout from "@/components/layouts/RegisterLayout";
import { GiveRegisterForm } from "@/components/register/GiveRegisterForm";
import Camera from "@/assets/icons/register/camera.svg?react";
import { AIGeneratingModal } from "@/components/register/AiGeneratingModal";
import { useEffect, useRef, useState } from "react";
import MagicIcon from "@/assets/icons/register/magic-icon.svg?react";
import QuestionMark from "@/assets/icons/register/question-mark.svg?react";
import CheckFail from "@/assets/icons/register/check-fail.svg?react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FreshResultModal } from "@/components/register/FreshResultModal";
import type { RecieveRegisterRequest } from "@/types/share";
import {
  confirmShareImages,
  createShare,
  presignShareImages,
  putToS3,
} from "@/apis/share";
import { getExtAndType } from "@/lib/utils";

type Preview = { id: string; file: File; url: string };

export const RegisterGive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFreshModalOpen, setIsFreshModalOpen] = useState(false);
  const [images, setImages] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX = 5;

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
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleAIClick = () => {
    if (images.length === 0) {
      toast("사진을 먼저 업로드 해주세요!", {
        icon: <CheckFail />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });
      console.log("클릭");
      return;
    }
    setIsModalOpen(true);
  };

  const handleVerifyClick = () => {
    if (images.length === 0) {
      toast("사진을 먼저 업로드 해주세요!", {
        icon: <CheckFail />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });
      console.log("클릭");
      return;
    }
    setIsFreshModalOpen(true);
  };

  //
  const handleSubmit = async (values: RecieveRegisterRequest) => {
    try {
      // 1) 메타데이터 생성
      const created = await createShare(values);
      const shareId: number =
        created.shareId ?? created.data?.shareId ?? created?.id;

      // 이미지 없으면 종료
      if (!images.length) {
        toast.success("나눔이 등록되었어요!");
        return;
      }

      // 2) presign 발급용 payload
      const presignItems = images.map((p, idx) => {
        const { ext, contentType } = getExtAndType(p.file);
        return { seq: idx, ext, contentType, sizeBytes: p.file.size };
      });

      // 2-1) presign 요청
      const signed = await presignShareImages(shareId, presignItems);

      // 3) S3로 PUT 업로드 (presign 응답의 seq로 파일 매칭)
      await Promise.all(
        signed.map(async (s) => {
          const f = images[s.seq]?.file;
          if (!f) return; // 혹시 배열 불일치 방어
          const { contentType } = getExtAndType(f);
          await putToS3(s.putUrl, f, contentType);
        })
      );

      // 4) confirm(커밋) -> 서버가 최종 Share 데이터(이미지 포함) 반환
      const finalShare = await confirmShareImages(
        shareId,
        signed.map((s) => ({ seq: s.seq, objectKey: s.objectKey }))
      );

      // 대표 이미지 publicUrl (seq=0 규칙)
      const primary =
        finalShare?.images?.find((i) => i.seq === 0)?.publicUrl ?? null;

      console.log("최종 등록", finalShare, primary);
      toast.success("이미지까지 업로드 완료!");

      // TODO: 필요시 라우팅/초기화
      // setImages([]);
      // navigate(ROUTES.SHARELIST);
    } catch (err) {
      console.error(err);
      toast.error("업로드 중 문제가 발생했어요.");
    }
  };
  return (
    <RegisterLayout header={"나눠주기"}>
      <div className="flex flex-col px-5 pt-11 gap-5">
        {/* 사진 section */}
        <div className="flex flex-col gap-4">
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
            onChange={onPickFiles}
            className="hidden"
          />

          <button
            className="subhead-03 flex flex-row h-11 items-center justify-center border border-blue-normal text-blue-normal gap-2 rounded-full"
            onClick={handleVerifyClick}
          >
            신선제품 인증하기 <QuestionMark />
          </button>

          <button
            className="w-fit flex flex-row px-[14px] py-[7px] mt-3 subhead-03 items-center bg-blue-light text-blue-normal rounded-xl gap-[6px]"
            onClick={handleAIClick}
          >
            <MagicIcon />
            AI로 작성하기
          </button>
        </div>
        {/* 입력폼 */}
        <GiveRegisterForm onSubmit={handleSubmit} />
      </div>
      <AIGeneratingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <FreshResultModal
        open={isFreshModalOpen}
        onClose={() => setIsFreshModalOpen(false)}
        fresh_result={"SPOILED"}
      />
    </RegisterLayout>
  );
};
