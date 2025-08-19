import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { TimeInput } from "../common/TimeInput";

interface ReceiveRegisterFormProps {
  onSubmit: () => void;
}

const STORE_OPEN_TIME = "09:00";
const STORE_CLOSE_TIME = "18:00";

export const ReceiveRegisterForm = ({ onSubmit }: ReceiveRegisterFormProps) => {
  const [title, setTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

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

  const isTimeFilled =
    storeTimeChecked ||
    (startTime.trim().length === 5 && endTime.trim().length === 5);

  const isValid =
    title.trim().length > 0 &&
    itemName.trim().length > 0 &&
    quantity.trim().length > 0 &&
    isTimeFilled;

  return (
    <form
      className="flex flex-col gap-10 pb-[81px] mb-19"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isValid) return;
        onSubmit();
      }}
    >
      {/* 제목 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>제목</span>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 작성해주세요"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>
      {/* 품목명 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span>품목명</span>
        <Input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="자세하게 적어주세요"
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>
      {/* 브랜드 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span className="flex flex-row">
          브랜드<span className="text-gray-400">(선택)</span>
        </span>
        <Input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="ex) 매일"
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
          placeholder="필요한 수량을 적어주세요."
          className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
             focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus-visible:border-blue-normal"
        />
      </div>
      {/* 물품 설명 */}
      <div className="subhead-02 text-gray-700 flex flex-col gap-4">
        <span className="flex flex-row">
          설명<span className="text-gray-400">(선택)</span>
        </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="사장님에게 물품에 대해 설명해주세요. ex. 물품이 필요한 이유, 간절함 어필 등등)"
          className="body-long-02 h-[138px] p-4 text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-0 focus:border-blue-normal"
        />
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
              className={`body-02 w-full !h-11 border border-gray-200 rounded-lg px-4 py-[15px]

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
      <div className="fixed bottom-0 inset-x-0 mx-5 pt-3 pb-4 boder-t border-gray-100 bg-white">
        <Button
          type="submit"
          disabled={!isValid}
          className={`subhead-03 w-full h-12 rounded-full ${
            isValid
              ? "bg-blue-normal text-white hover:bg-blue-normal-hover active:bg-blue-normal-active"
              : "bg-gray-100 text-gray-300 pointer-events-none"
          }`}
        >
          업로드
        </Button>
      </div>
    </form>
  );
};
