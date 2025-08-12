import { ROUTES } from "@/constants/routes";
import { ProductBox } from "./ProductBox";
import { useNavigate } from "react-router-dom";

export const ProductList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <p className="py-[6px] w-[66px] h-[29px] px-[12px] bg-[#DDF0FF] text-[14px] rounded-[48px] flex items-center justify-center text-[#3CADFF] font-bold mb-2">
        AI 추천
      </p>
      <h4
        className="headline-02 block mb-[24px]"
        onClick={() => navigate(ROUTES.SHARELIST)}
      >
        우리동네 재고 나눔 →
      </h4>
      <div className="flex flex-col gap-4">
        <ProductBox />
        <ProductBox />
        <ProductBox />
      </div>
    </div>
  );
};
