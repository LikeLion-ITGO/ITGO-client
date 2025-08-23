import { Button } from "../ui/button";
// import sampleImg from "../../assets/images/sampleMilk.png";
import timeIcon from "../../assets/icons/home/timeIcon.svg";
import type { ShareResponse } from "@/types/share";
import { formatLocalTime } from "@/types/time";
import { useNavigate } from "react-router-dom";

interface productType {
  type?: "default" | "simple" | "noBtn";
  item: ShareResponse;
}

export const ProductBox = ({ item, type = "default" }: productType) => {
  const navigate = useNavigate();
  const id = item.shareId;
  return (
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
            <div className="caption text-[#BCC3CE] w-[30px]">5분 전</div>
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
            <p>{item.expirationDate.replace("-", ".").replace("-", ".")}까지</p>
          </div>
        </div>
      </div>
      {type == "default" && (
        <Button
          className="w-full h-[44px] rounded-[76px] subhead-03 text-blue-normal bg-white border-[#3CADFF] border-[1px] active:bg-[#DDF0FF] hover:bg-[#fff]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          요청하기
        </Button>
      )}
    </div>
  );
};
