import sampleStore from "@/assets/images/sampleStore.png";

import grayArrow from "@/assets/icons/ShareListPage/grayArrow.svg";
import backIcon from "@/assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { ShareSection } from "@/components/home/bottom/ShareSection";
import { Button } from "@/components/ui/button";
import { ShareImageSwiper } from "@/components/shareDetailPage/ShareImageSwiper";
import { useEffect, useMemo, useState } from "react";
import { ShareDeleteModal } from "@/components/shareDetailPage/ShareDeleteModal";
import { ROUTES } from "@/constants/routes";

type ShareStatus = "open" | "closed" | "requested";

export const ShareDetailPage = () => {
  const navigate = useNavigate();

  const [status, setStatus] = useState<ShareStatus>("open");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const isOwner: boolean = true; //나중에
  useEffect(() => setStatus("open"), []); // 나중에 연결할때 수정하깅

  const sampleData = {
    브랜드: "매일",
    유통기한: "오늘까지",
    보관방식: "냉장",
    거래장소: "노원구 공릉동 99로",
    운영시간: "10:00~19:00",
  };

  const requestButton = useMemo<{ label: string; disabled: boolean }>(() => {
    switch (status) {
      case "open":
        return { label: "나눔 요청하기", disabled: false };
      case "closed":
        return { label: "앗 이미 끝난 나눔이에요..!", disabled: true };
      case "requested":
        return { label: "이미 요청한 나눔이에요", disabled: true };
      default:
        return { label: "", disabled: true };
    }
  }, [status]);

  return (
    <MainLayout bgcolor="#fff">
      <div className="relative -mx-[20px] h-[400px]">
        <ShareImageSwiper />
        {/* 위에부분 사진-> 어떻게 나오는지 체크하고 수정 */}
        <img
          src={backIcon}
          alt="<"
          className="absolute left-[20px] top-[12px] z-3"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="w-full bg-[#F5F7FA] h-[80px] rounded-[24px] p-4 flex items-center gap-2 mt-5 mb-8">
        <img
          src={sampleStore}
          alt="가게 이미지"
          className="w-[48px] h-[48px] rounded-full mr-1 object-cover"
        />
        <p className="headline-01">스무 하루</p>
        <img src={grayArrow} alt=">" />
      </div>
      <div>
        <h4 className="headline-02 mb-4">오리지널우유 1L 2팩</h4>
        <p className="text-[#47484B] body-long-02 mb-8">
          상품 설명상품 설명상품 설명상품 설명상품 설명상품 설명상품 설명상품
          설명상품 설명상품 설명상품 설명상품 설명상품 설명상품 설명상품
          설명상품 설명
        </p>
        <div className="flex flex-col gap-y-[16px]">
          {Object.entries(sampleData).map(([key, value]) => (
            <div key={key} className="flex  gap-x-[28px]">
              <span className="w-[55px] body-02 text-[#8F9498]">{key}</span>
              <span className="subhead-03 text-[#47484B]">{value}</span>
            </div>
          ))}
        </div>
        <div className="mb-[90px]">
          <ShareSection />
        </div>
        <div className="bg-white w-full h-[77px] fixed -bottom-1 inset-x-0 px-[20px] pt-[12px] pb-[17px] z-50 border-[2px] border-t border-[#fff] ">
          {isOwner ? (
            <div className="flex gap-2">
              <Button
                className="w-[162px] h-[48px] rounded-[76px] bg-[#DDF0FF] text-[#0C3756] subhead-03"
                onClick={() => setOpenDeleteModal(true)}
              >
                삭제하기
              </Button>
              <Button
                className="w-[162px] h-[48px] rounded-[76px] bg-[#3CADFF] subhead-03 text-[#fff]"
                onClick={() => navigate(ROUTES.REGISTER_GIVE)}
              >
                수정하기
              </Button>
            </div>
          ) : (
            <Button
              className={`w-full h-[48px] rounded-[76px] subhead-03  ${
                requestButton.disabled
                  ? "bg-[#DDF0FF] text-[#0C3756] disabled:opacity-100"
                  : "bg-[#3CADFF] text-[#fff] active:bg-[#DDF0FF] active:text-[#3CADFF]"
              }`}
              disabled={requestButton.disabled}
            >
              {requestButton.label}
            </Button>
          )}
        </div>
      </div>
      <ShareDeleteModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => navigate(-1)} //지우는거 추가하기
      />
    </MainLayout>
  );
};
