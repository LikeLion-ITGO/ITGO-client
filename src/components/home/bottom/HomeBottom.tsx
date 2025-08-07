import { FloatingButton } from "./FloatingButton";
import { ShareBox } from "./ShareBox";
import adIMG from "../../../assets/images/ad.png";

export const HomeBottom = () => {
  return (
    <div>
      <div className="mx-[-20px] mb-[64px]">
        <img src={adIMG} className="w-full" />
      </div>
      <ShareBox />
      <div className="flex justify-end ">
        <FloatingButton />
      </div>
    </div>
  );
};
