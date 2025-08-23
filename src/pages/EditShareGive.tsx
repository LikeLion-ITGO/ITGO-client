// src/pages/EditShareGive.tsx
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
import type {
  PresignRequestItem,
  ShareCreateReq,
  ShareDetail,
  ShareImage,
} from "@/types/share";
import {
  presignShareImageDrafts,
  putToS3,
  updateShare,
  getShareById,
} from "@/apis/share";
import { getExtAndType } from "@/lib/utils";
import ToolTip from "@/assets/icons/register/tooltip.svg";
import { useNavigate, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

type Preview = {
  id: string;
  file?: File; // 기존 이미지는 file 없음
  url: string; // 기존: publicUrl, 신규: ObjectURL
  draftKey?: string; // 신규: draftKey, 기존: objectKey를 여기 넣어 보냄(서버 합의)
  uploading?: boolean;
  isNew?: boolean;
};

export const EditShareGive = () => {
  const { id } = useParams<{ id: string }>();
  const shareId = Number(id);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipOpen, setIsToolTipOpen] = useState(false);
  const [isFreshModalOpen, setIsFreshModalOpen] = useState(false);
  const [images, setImages] = useState<Preview[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX = 5;

  // 기존 데이터
  const {
    data: share,
    isLoading,
    isError,
  } = useQuery<ShareDetail>({
    queryKey: ["shareDetail", shareId],
    queryFn: () => getShareById(shareId),
    enabled: !!shareId,
  });

  // 기존 이미지 --> 썸네일 채우기
  useEffect(() => {
    if (!share) return;
    const previews: Preview[] = (share.images ?? []).map(
      (img: ShareImage, i: number) => ({
        id: `existing-${i}`,
        url: img.publicUrl,
        draftKey: img.objectKey,
        uploading: false,
        isNew: false,
      })
    );
    setImages(previews);
  }, [share]);

  useEffect(() => {
    return () =>
      images.forEach((p) => {
        if (p.isNew && p.url?.startsWith("blob:")) URL.revokeObjectURL(p.url);
      });
  }, [images]);

  const openPicker = () => fileInputRef.current?.click();

  // 새 파일 선택 → presign → S3 PUT → draftKey 저장
  const onPickFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!files.length) return;

    const remain = MAX - images.length;
    const picked = files.slice(0, Math.max(0, remain));
    if (!picked.length) return;

    // 기존 이미지 개수부터 시작
    const existingCount = images.filter((p) => !p.isNew).length;

    const pending: Preview[] = picked.map((f) => ({
      id: `${f.name}-${f.size}-${crypto.randomUUID?.() ?? Math.random()}`,
      file: f,
      url: URL.createObjectURL(f),
      uploading: true,
      isNew: true,
    }));
    setImages((prev) => [...prev, ...pending]);

    try {
      const reqItems: PresignRequestItem[] = picked.map((f, i) => {
        const { ext, contentType } = getExtAndType(f);
        return { seq: existingCount + i, ext, contentType, sizeBytes: f.size };
      });

      const signed = await presignShareImageDrafts(reqItems);
      const bySeq = new Map(signed.map((s) => [s.seq, s]));

      await Promise.all(
        picked.map(async (f, i) => {
          const seq = existingCount + i;
          const s = bySeq.get(seq);
          if (!s) throw new Error(`No presign for seq=${seq}`);
          const { contentType } = getExtAndType(f);
          await putToS3(s.putUrl, f, contentType);

          setImages((prev) =>
            prev.map((p) =>
              p.id === pending[i].id
                ? { ...p, draftKey: s.draftKey, uploading: false }
                : p
            )
          );
        })
      );
    } catch (err) {
      console.error("presign/upload 실패:", err);
      setImages((prev) => prev.filter((p) => !p.uploading));
      toast.error("이미지 업로드에 실패했어요. 다시 시도해 주세요.");
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const t = prev.find((p) => p.id === id);
      if (t?.isNew && t.url?.startsWith("blob:")) URL.revokeObjectURL(t.url);
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
      return;
    }
    setIsFreshModalOpen(true);
  };

  // 제출: draftKey 들만 모아 PUT
  const handleSubmit = async (values: Omit<ShareCreateReq, "images">) => {
    try {
      if (images.some((p) => p.uploading)) {
        toast("이미지 업로드가 끝나길 기다려주세요.");
        return;
      }
      if (images.some((p) => p.isNew && !p.draftKey)) {
        toast.error("일부 새 이미지의 업로드가 완료되지 않았어요.");
        return;
      }

      const newDrafts = images
        .filter((p) => p.isNew)
        .map((p, idx) => ({
          seq: idx,
          draftKey: p.draftKey!,
        }));

      const imageItems = images.map((p, idx) => ({
        seq: idx,
        draftKey: p.draftKey!, // 기존은 objectKey, 신규는 presign draftKey
      }));

      // console.log(imageItems);
      // const payload: ShareCreateReq = { ...values, images: newDrafts };

      const payload: ShareCreateReq =
        newDrafts.length > 0
          ? { ...values, images: imageItems }
          : { ...values };
      console.log(payload);
      await updateShare(shareId, payload);

      toast("나눔이 성공적으로 업로드되었어요!", {
        icon: <FreshIcon className="w-[20px] h-[20px]" />,
        unstyled: true,
        classNames: {
          toast:
            "w-full h-14 flex flex-row items-center px-5 py-4 bg-[#5F6165] rounded-xl gap-[10px]",
          title: "subhead-03 text-white",
        },
      });
      navigate(`/sharelist/${id}`);
    } catch (e) {
      console.log(e);
      toast.error("수정 중 문제가 발생했어요.");
    }
  };
  if (isLoading)
    return (
      <RegisterLayout header={"나눔 수정하기"}>
        <div className="p-5">불러오는 중…</div>
      </RegisterLayout>
    );
  if (isError || !share)
    return (
      <RegisterLayout header={"나눔 수정하기"}>
        <div className="p-5">데이터를 불러오지 못했어요.</div>
      </RegisterLayout>
    );

  const initialValues: Omit<ShareCreateReq, "images"> = {
    itemName: share.itemName ?? "",
    brand: share.brand ?? "",
    quantity: share.quantity ?? 0,
    description: share.description ?? "",
    expirationDate: share.expirationDate ?? "",
    storageType: share.storageType,
    freshCertified: share.freshCertified ?? false,
    openTime: share.openTime ?? "",
    closeTime: share.closeTime ?? "",
  };

  return (
    <RegisterLayout header={"나눔 수정하기"}>
      <div className="flex flex-col px-5 pt-11 gap-5">
        {/* 사진 영역 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 relative">
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

          {/* 파일 입력 */}
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

        {/* 폼 */}
        <GiveRegisterForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
          buttonText="수정하기"
        />
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
