import { useEffect, useState } from "react";
import { ProductBox } from "../productList/ProductBox";
import type { ShareResponse } from "@/types/share";
import { fetchShareList } from "@/apis/share";

export const ShareProductList = () => {
  const [list, setList] = useState<ShareResponse[]>([]);

  useEffect(() => {
    fetchShareList(0, 20).then((data) => {
      setList(data.content);
    });
  }, []);

  if (!list.length)
    return (
      <div className="w-full h-[100vh] text-center text-[gray]">
        아직 나눔중인 재고가 없습니다.
      </div>
    );
  return (
    <div className="flex flex-col gap-4 mb-[19px] w-full h-[100vh]">
      {list.map((item) => (
        <ProductBox key={item.shareId} item={item} />
      ))}
    </div>
  );
};
