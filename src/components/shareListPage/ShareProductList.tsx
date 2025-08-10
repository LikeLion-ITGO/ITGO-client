import { ProductBox } from "../productList/ProductBox";

export const ShareProductList = () => {
  return (
    <div className="flex flex-col gap-4 mb-[19px]">
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
      <ProductBox />
    </div>
  );
};
