import { Button } from "../ui/button";
// import sampleImg from "../../assets/images/sampleMilk.png";
import timeIcon from "../../assets/icons/home/timeIcon.svg";
import type { ShareResponse } from "@/types/share";
import { formatLocalTime, formatTimeAgo } from "@/types/time";
import { useNavigate } from "react-router-dom";
import { ProductReqModal } from "./ProductReqModal";
import { useState } from "react";
import { claimQuick } from "@/apis/share";
import { toast } from "sonner";
import axios from "axios";

interface productType {
  type?: "default" | "simple" | "noBtn";
  item: ShareResponse;
}

export const ProductBox = ({ item, type = "default" }: productType) => {
  const navigate = useNavigate();
  const id = item.shareId;
  const [openReqModal, setOpenReqModal] = useState(false);

  type ApiErrorBody = {
    code?: string;
    message?: string;
    error?: string;
    details?: unknown;
  };

  // Object 체크
  function isRecord(v: unknown): v is Record<string, unknown> {
    return typeof v === "object" && v !== null;
  }

  // 에러 메시지
  function getApiErrorMessage(err: unknown): string {
    if (axios.isAxiosError<ApiErrorBody>(err)) {
      const data = err.response?.data;
      if (isRecord(data)) {
        const msg =
          (typeof data.message === "string" && data.message) ||
          (typeof data.error === "string" && data.error);
        if (msg) return msg;
      }

      const status = err.response?.status;
      if (status) return `요청이 실패했어요 (HTTP ${status}).`;
      return "네트워크 요청에 실패했어요.";
    }

    if (err instanceof Error && err.message) return err.message;
    return "알 수 없는 오류가 발생했어요.";
  }

  console.log(">>>>.", item.regDate);
  console.log(item);
  return (
    <div>
      <div
        onClick={() => navigate(`/sharelist/${id}`)}
        className={`${
          type == "simple"
            ? "h-[104px]"
            : type == "noBtn"
            ? "h-[130[x]] "
            : "h-[198px]"
        } rounded-[24px] border border-[#F5F7FA] bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]  p-[20px] justify-between flex flex-col`}
      >
        <div className="gap-[16px] flex ">
          <div>
            {item.primaryImageUrl ? (
              <div
                className={`${
                  type == "simple" ? "w-[64px] h-[64px]" : "w-[90px] h-[90px]"
                }`}
              >
                <img
                  src={item.primaryImageUrl}
                  alt="제품사진"
                  className={`${
                    type == "simple" ? "w-[64px] h-[64px]" : "w-[90px] h-[90px]"
                  } rounded-full object-cover `}
                />
              </div>
            ) : (
              <div
                className={`rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm ${
                  type == "simple" ? "w-[64px] h-[64px]" : "w-[90px] h-[90px]"
                } `}
              >
                No Img
              </div>
            )}
          </div>
          <div className="flex w-full flex-col justify-between">
            <div className="flex  justify-between">
              <div className="gap-[6px] flex flex-1 flex-col">
                <p className="leading-[100%] font-medium tracking-[-0.4px] text-[14px] text-[#47484B]">
                  [{item.brand}]
                </p>
                <p className="headline-01">
                  {item.itemName} {item.quantity}개
                </p>
              </div>
              <div className="caption text-[#BCC3CE] min-w-[33px] max-w-[50px]">
                {formatTimeAgo(item.regDate)}
              </div>
            </div>
            <div className=" flex flex-col body-01 gap-[8px] text-[#777A7F]">
              {type != "simple" && (
                <div className="flex items-center">
                  <p>1Km</p>
                  <span className="bg-[#D9D9D9] w-[1px] h-[10px]  mx-[8px] inline-block"></span>
                  <img src={timeIcon} className="w-[16px] h-[16px] mr-[4px]" />
                  <p>
                    {formatLocalTime(item.openTime)}~
                    {formatLocalTime(item.closeTime)}
                  </p>
                </div>
              )}
              <p>
                {item.expirationDate.replace("-", ".").replace("-", ".")}까지
              </p>
            </div>
          </div>
        </div>
        {type == "default" && (
          <Button
            className="w-full h-[44px] rounded-[76px] subhead-03 text-blue-normal bg-white border-[#3CADFF] border-[1px] active:bg-[#DDF0FF] hover:bg-[#fff]"
            onClick={(e) => {
              e.stopPropagation();
              setOpenReqModal(true);
            }}
          >
            요청하기
          </Button>
        )}
      </div>
      <ProductReqModal
        open={openReqModal}
        onClose={() => setOpenReqModal(false)}
        defaultOpenTime={item.openTime.slice(0, 5)} // "HH:mm"
        defaultCloseTime={item.closeTime.slice(0, 5)} // "HH:mm"
        onConfirm={async (form) => {
          try {
            const payload = {
              shareId: id,
              quantity: Number(form.quantity),
              openTime: form.openTime.trim(),
              closeTime: form.closeTime.trim(),
              title: form.title.trim(),
              description: (form.description ?? "").trim(),
            };

            await claimQuick(payload);
            toast.success("요청이 접수되었습니다!");
          } catch (err: unknown) {
            const msg = getApiErrorMessage(err);
            console.error("claimQuick error:", err);
            toast.error(msg);
          } finally {
            setOpenReqModal(false);
          }
        }}
      />
    </div>
  );
};
