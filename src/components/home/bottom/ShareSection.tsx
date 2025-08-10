import { ShareBox } from "./ShareBox";
import adIMG from "../../../assets/images/ad.png";

export const ShareSection = () => {
  return (
    <div>
      <div className="mx-[-20px] mb-[64px] mt-[64px]">
        <img src={adIMG} className="w-full" />
      </div>
      <ShareBox />
    </div>
  );
};
