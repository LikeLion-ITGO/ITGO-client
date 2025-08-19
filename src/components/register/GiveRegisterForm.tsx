import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TimeInput } from "../common/TimeInput";
import clsx from "clsx";

const STORE_OPEN_TIME = "09:00";
const STORE_CLOSE_TIME = "18:00";

export const GiveRegisterForm = () => {
  const [selectedMethod, setSelectedMethod] = useState("냉장");

  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [desc, setDesc] = useState("");
  const [expiry, setExpiry] = useState("");

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [storeTimeChecked, setStoreTimeChecked] = useState(false);

  const handleStoreTimeToggle = (checked: boolean) => {
    setStoreTimeChecked(checked);

    if (checked) {
      setStartTime(STORE_OPEN_TIME);
      setEndTime(STORE_CLOSE_TIME);
    } else {
      setStartTime("");
      setEndTime("");
    }
  };

  // ✅ 필수값 모두 채워졌는지 검증
  const hasTimes =
    storeTimeChecked || (startTime.length === 5 && endTime.length === 5);
  const isValid =
    itemName.trim().length > 0 &&
    brand.trim().length > 0 &&
    quantity.trim().length > 0 &&
    desc.trim().length > 0 &&
    expiry.trim().length > 0 &&
    hasTimes &&
    selectedMethod; // 보관방식은 기본값 존재

  return (
    <form className="flex flex-col gap-10 pb-[66px] mb-19">
      {/* 품목명 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>품목명</span>
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="우유"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>

      {/* 브랜드 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>브랜드</span>
        <Input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="잇고"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>

      {/* 수량 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>수량</span>
        <Input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="4개"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>

      {/* 물품 설명 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>물품설명</span>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="물품에 대한 설명을 입력해주세요"
          className="body-02 h-[138px] p-4 text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-0 focus:border-blue-normal"
        />
      </div>

      {/* 유통기한 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>유통기한</span>
        <Input
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="2025.12.25까지"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>

      {/* 보관방식 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-3">
        <span>보관방식</span>
        <div className="flex gap-3">
          {["냉장", "냉동", "상온"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedMethod(label)}
              className={`subhead-03 px-6 py-3 rounded-full
          ${
            selectedMethod === label
              ? "bg-gray-600 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>거래가능 시간대</span>
        <div className="flex flex-row gap-2">
          <div className="flex-1 min-w-0">
            <TimeInput
              value={startTime}
              onChange={setStartTime}
              placeholder="10:00"
              disabled={storeTimeChecked}
              className={`body-02 w-full !h-11 border border-gray-200 rounded-lg px-4 py-[15px]
    placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:border-blue-normal
    ${storeTimeChecked ? "bg-gray-100 text-gray-200" : "text-gray-900"}`}
            />
          </div>
          <span className="body-02 flex items-center text-gray-400">~</span>

          <div className="flex-1 min-w-0">
            <TimeInput
              value={endTime}
              onChange={setEndTime}
              placeholder="19:00"
              disabled={storeTimeChecked}
              className={`w-full body-02 !h-11 border border-gray-200 rounded-lg px-4 py-[15px]
    placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:border-blue-normal
    ${storeTimeChecked ? "bg-gray-100 text-gray-200" : "text-gray-900"}`}
            />
          </div>
        </div>
        {/* 가게 운영 시간과 동일 여부 */}
        <div className="flex flex-row items-center gap-[6px]">
          <Checkbox
            id="store-time"
            checked={storeTimeChecked}
            onCheckedChange={handleStoreTimeToggle}
            className="w-[18px] h-[18px] border border-gray-200 rounded-xs data-[state=checked]:bg-blue-normal data-[state=checked]:border-blue-normal"
          />
          <span className="subhead-02 text-gray-700">가게 운영시간과 동일</span>
        </div>
      </div>

      {/* 업로드 버튼 */}
      <div className="fixed bottom-0 inset-x-0 pt-3 pb-4 mx-5 boder-t border-gray-100 bg-white">
        <Button
          disabled={!isValid}
          className={clsx(
            "subhead-03 w-full h-12 rounded-full",
            isValid
              ? "bg-blue-normal text-white hover:bg-blue-normal-hover active:bg-blue-normal-active"
              : "bg-gray-100 text-gray-300 pointer-events-none"
          )}
        >
          업로드
        </Button>
      </div>
    </form>
  );
};
