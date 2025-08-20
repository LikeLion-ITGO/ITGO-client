import { ROUTES } from "@/constants/routes";
import { ProductBox } from "./ProductBox";
import { useNavigate } from "react-router-dom";
import type { ShareResponse } from "@/types/share";
import { useEffect, useState } from "react";
import { fetchShareList } from "@/apis/share";

export const ProductList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<ShareResponse[]>([]);

  useEffect(() => {
    fetchShareList(0, 3).then((data) => {
      setList(data.content);
    });
  }, []);
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
      {!list.length ? (
        <div className="w-full h-[100vh] text-center text-[gray]">
          아직 나눔중인 재고가 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((item) => (
            <ProductBox key={item.shareId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
