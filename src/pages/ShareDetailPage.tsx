import sampleBigMilk from "@/assets/images/sampleBigMilk.png";
import sampleStore from "@/assets/images/sampleStore.png";

import grayArrow from "@/assets/icons/ShareListPage/grayArrow.svg";
import backIcon from "@/assets/icons/back.svg";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { ShareSection } from "@/components/home/bottom/ShareSection";
import { Button } from "@/components/ui/button";

export const ShareDetailPage = () => {
  const navigate = useNavigate();

  const sampleData = {
    브랜드: "매일",
    유통기한: "오늘까지",
    보관방식: "냉장",
    거래장소: "노원구 공릉동 99로",
    운영시간: "10:00~19:00",
  };

  return (
    <MainLayout bgcolor="#fff">
      <div className="relative -mx-[20px] ">
        <img
          src={sampleBigMilk}
          alt="샘플 우유"
          className=" w-full h-[400px] -pt-[44px] object-cover"
        />
        {/* 위에 어떻게 나오는지 체크하고 수정 */}
        <img
          src={backIcon}
          alt="<"
          className="absolute left-[20px] top-[12px] "
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
        <ShareSection />
        <Button className="w-full h-[48px] rounded-[76px] bg-[#3CADFF] subhead-03 mt-[22px] mb-[48px] active:bg-[#DDF0FF] active:text-[#3CADFF]">
          나눔 요청하기
        </Button>
      </div>
    </MainLayout>
  );
};
