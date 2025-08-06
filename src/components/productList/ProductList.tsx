import { ProductBox } from "./ProductBox";

export const ProductList = () => {
  return (
    <div className="flex flex-col">
      <h4 className="headline-02 block mb-[24px]">우리동네 재고 나눔 →</h4>
      <ProductBox />
      <ProductBox />
      <ProductBox />
    </div>
  );
};
