import { Button } from "../ui/button";
import sampleImg from "../../assets/images/sampleMilk.png";
import timeIcon from "../../assets/icons/home/timeIcon.svg";

interface productType {
  type?: "default" | "simple" | "noBtn";
}

export const ProductBox = ({ type = "default" }: productType) => {
  return (
    <div
      className={`${
        type == "simple"
          ? "h-[104px]"
          : type == "noBtn"
          ? "h-[130[x]] "
          : "h-[198px]"
      } rounded-[24px] border border-[#F5F7FA] bg-white shadow-[0_2px_12px_0_rgba(0,0,0,0.05)]  p-[20px] justify-between flex flex-col`}
    >
      <div className="gap-[16px] flex ">
        <img
          src={sampleImg}
          alt="제품사진"
          className={`${
            type == "simple" ? "w-[64px] h-[64px]" : "w-[90px] h-[90px]"
          } `}
        />
        <div className="flex w-full flex-col justify-between">
          <div className="flex  justify-between">
            <div className="gap-[6px] flex flex-col">
              <p className="leading-[100%] font-medium tracking-[-0.4px] text-[14px] text-[#47484B]">
                [브랜드]
              </p>
              <p className="headline-01">제품명 수량</p>
            </div>
            <div className="caption text-[#BCC3CE]">5분 전</div>
          </div>
          <div className=" flex flex-col body-01 gap-[8px] text-[#777A7F]">
            {type != "simple" && (
              <div className="flex items-center">
                <p>1Km</p>
                <span className="bg-[#D9D9D9] w-[1px] h-[10px]  mx-[8px] inline-block"></span>
                <img src={timeIcon} className="w-[16px] h-[16px] mr-[4px]" />
                <p>00:00~00:00</p>
              </div>
            )}
            <p>2025.05.23까지</p>
          </div>
        </div>
      </div>
      {type == "default" && (
        <Button className="w-full h-[44px] rounded-[76px] subhead-03 text-blue-normal bg-white border-[#3CADFF] border-[1px] ">
          요청하기
        </Button>
      )}
    </div>
  );
};
