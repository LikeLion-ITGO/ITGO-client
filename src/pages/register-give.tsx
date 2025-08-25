import RegisterLayout from "@/components/layouts/RegisterLayout";
import { GiveRegisterForm } from "@/components/register/GiveRegisterForm";
import Camera from "@/assets/icons/register/camera.svg?react";
import { AIGeneratingModal } from "@/components/register/AiGeneratingModal";
import { useEffect, useRef, useState } from "react";
import MagicIcon from "@/assets/icons/register/magic-icon.svg?react";
import QuestionMark from "@/assets/icons/register/question-mark.svg?react";
import CheckFail from "@/assets/icons/register/check-fail.svg?react";
import FreshIcon from "@/assets/icons/register/fresh-icon.svg?react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FreshResultModal } from "@/components/register/FreshResultModal";
import type { PresignRequestItem, ShareCreateReq } from "@/types/share";
import { createShare, presignShareImageDrafts, putToS3 } from "@/apis/share";
import { getExtAndType } from "@/lib/utils";
import ToolTip from "@/assets/icons/register/tooltip.svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { aiFreshness } from "@/apis/ai";

type Preview = {
  id: string;
  file: File;
  url: string;
  draftKey?: string;
  uploading?: boolean;
};

type FreshResult = "Fresh" | "Half-Fresh" | "Spoiled";

export const RegisterGive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipOpen, setIsToolTipOpen] = useState(false);
  const [isFreshModalOpen, setIsFreshModalOpen] = useState(false);
  const [images, setImages] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [finalLabel, setFinalLabel] = useState<FreshResult>("Fresh");


  const MAX = 5;
  const navigate = useNavigate();
  const certified = images.length > 0 && finalLabel !== "Spoiled";

  useEffect(() => {
    return () => images.forEach((p) => URL.revokeObjectURL(p.url));
  }, [images]);

  const openPicker = () => fileInputRef.current?.click();

  // 선택 즉시: presign(draft) → PUT → draftKey 저장
  const onPickFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const remain = MAX - images.length;
    const picked = files.slice(0, Math.max(0, remain));
    if (!picked.length) return;

    // 우선 미리보기 붙이고 uploading=true로 표시
    const startIndex = images.length;
    const pending: Preview[] = picked.map((f) => ({
      id: `${f.name}-${f.size}-${crypto.randomUUID?.() ?? Math.random()}`,
      file: f,
      url: URL.createObjectURL(f),
      uploading: true,
    }));
    setImages((prev) => [...prev, ...pending]);
    setIsToolTipOpen(true);

    try {
      // presign(draft) – 여러장 한 번에
      const presignItems: PresignRequestItem[] = picked.map((f, i) => {
        const { ext, contentType } = getExtAndType(f);
        // seq는 임시로 현재 배열 순서를 부여 (응답 매칭용)
        return { seq: startIndex + i, ext, contentType, sizeBytes: f.size };
      });

      const signed = await presignShareImageDrafts(presignItems); // [{seq, putUrl, draftKey, ...}]
      const bySeq = new Map(signed.map((s) => [s.seq, s]));

      // S3 PUT 업로드
      await Promise.all(
        picked.map(async (f, i) => {
          const seq = startIndex + i;
          const s = bySeq.get(seq);
          if (!s) throw new Error(`No presign for seq=${seq}`);
          const { contentType } = getExtAndType(f);
          await putToS3(s.putUrl, f, contentType);
          // 업로드 성공 → 해당 이미지에 draftKey 저장 + uploading=false
          setImages((prev) =>
            prev.map((p, idx) =>
              idx === seq ? { ...p, draftKey: s.draftKey, uploading: false } : p
            )
          );
        })
      );
    } catch (err) {
      console.error("presign/upload 실패:", err);
      // 실패난 것들은 제거
      setImages((prev) => prev.filter((p) => !p.uploading));
      toast.error("이미지 업로드에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const toFreshResult = (v: string): FreshResult => {
    const k = (v ?? "")
      .trim()
      .toUpperCase()
      .replace(/[\s_]+/g, "-");
    switch (k) {
      case "FRESH":
        return "Fresh";
      case "HALF-FRESH":
        return "Half-Fresh";
      case "SPOILED":
        return "Spoiled";
      default:
        return "Spoiled";
    }
  };

  const dropSpoiledByResults = (results: string[] | undefined) => {
    if (!Array.isArray(results) || results.length === 0) return 0;

    const labels = results.map(toFreshResult);
    const removedCount = labels.filter((l) => l === "Spoiled").length;

    if (removedCount === 0) return 0;

    setImages((prev) => {
      // URL 정리 + Spoiled만 제거
      prev.forEach((p, i) => {
        if (labels[i] === "Spoiled") URL.revokeObjectURL(p.url);
      });
      return prev.filter((_, i) => labels[i] !== "Spoiled");
    });

    // 같은 파일 다시 선택 가능하도록 리셋
    if (fileInputRef.current) fileInputRef.current.value = "";

    return removedCount;
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const t = prev.find((p) => p.id === id);
      if (t) URL.revokeObjectURL(t.url);
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

  const handleVerifyClick = async () => {
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
      return;
    }

    try {
      const files = images.map((p) => p.file);
      const resp = await aiFreshness(files);

      const removed = dropSpoiledByResults(resp.results);
      if (removed > 0) {
        toast(
          `${removed}장의 사진이 신선하지 않아요. 제거했습니다. 다른 사진으로 다시 올려주세요.`
        );
      }

      setFinalLabel(resp.final_label);
      setIsFreshModalOpen(true);
    } catch (e) {
      console.error(e);
      toast.error("신선도 인증에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      console.log("신선도 인증");
    }
  };

  // 제출: draftKey만 모아 서버로 전송
  const handleSubmit = async (values: Omit<ShareCreateReq, "images">) => {
    try {
      // 업로드 중이거나 draftKey 없는 항목 있으면 막기
      if (images.some((p) => p.uploading)) {
        toast("이미지 업로드가 끝나길 기다려주세요.");
        return;
      }
      if (images.some((p) => !p.draftKey)) {
        toast.error("일부 이미지의 업로드가 완료되지 않았어요.");
        return;
      }

      const payload: ShareCreateReq = {
        ...values,
        images:
          images.length === 0
            ? []
            : images.map((p, idx) => ({
                seq: idx, // 현재 진열 순서를 서버 seq로 사용 (0이 대표)
                draftKey: p.draftKey!, // presign 때 받은 키
              })),
      };

      await createShare(payload);

      toast("나눔이 성공적으로 업로드되었어요!", {
        icon: <FreshIcon className="w-[20px] h-[20px]" />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });
      navigate(ROUTES.HOME);
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
          <div className="flex flex-row gap-2 relative">
            {/* 카메라 버튼 */}
            <button
              type="button"
              onClick={openPicker}
              className="w-[78px] h-[78px] flex flex-col items-center justify-center gap-[6px] text-gray-400 border border-gray-200 rounded-lg"
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
                  className="relative w-[78px] h-[78px] rounded-lg overflow-hidden"
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
            신선제품 인증하기
            <QuestionMark
              onClick={() => {
                setIsToolTipOpen((curr) => images.length == 0 && !curr);
              }}
            />
          </button>
          {isTooltipOpen && (
            <img
              src={ToolTip}
              alt="신선제품인증안내"
              className="absolute right-[25px] top-[230px]"
              onClick={() => setIsToolTipOpen(false)}
            />
          )}
          <button
            className="w-fit flex flex-row px-[14px] py-[7px] mt-3 subhead-03 items-center bg-blue-light text-blue-normal rounded-xl gap-[6px]"
            onClick={handleAIClick}
          >
            <MagicIcon />
            AI로 작성하기
          </button>
        </div>
        {/* 입력폼 */}
        <GiveRegisterForm onSubmit={handleSubmit} freshCertified={certified} />
      </div>
      <AIGeneratingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <FreshResultModal
        open={isFreshModalOpen}
        onClose={() => setIsFreshModalOpen(false)}
        fresh_result={finalLabel}
      />
    </RegisterLayout>
  );
};
