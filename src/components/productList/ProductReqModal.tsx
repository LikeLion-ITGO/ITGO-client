import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TimeInput } from "../common/TimeInput";
import { Checkbox } from "@radix-ui/react-checkbox";
// import type { ProductReqForm } from "@/apis/share";

export type ProductReqForm = {
  title: string;
  quantity: number;
  description: string;
  openTime: string; // "HH:mm"
  closeTime: string; // "HH:mm"
};

interface ProductReqModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (payload: ProductReqForm) => Promise<void>;
  defaultOpenTime: string; // 예: "10:00"
  defaultCloseTime: string; // 예: "19:00"
}

const MAX_DESC_LEN = 500;

export const ProductReqModal = ({
  open,
  onClose,
  onConfirm,
  defaultOpenTime,
  defaultCloseTime,
}: ProductReqModalProps) => {
  const [title, setTitle] = useState("");
  const [qty, setQty] = useState<string>("");
  const [desc, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [storeTimeChecked, setStoreTimeChecked] = useState(false);

  // 모달 열릴 때마다 초기화
  useEffect(() => {
    setTitle("");
    setQty("");
    setDesc("");
    setStartTime("");
    setEndTime("");
    setStoreTimeChecked(false);
  }, [open]);

  if (!open) return null;

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDesc(e.target.value.slice(0, MAX_DESC_LEN));

  const handleStoreTimeToggle = (checked: boolean) => {
    const on = !!checked;
    setStoreTimeChecked(on);
    if (on) {
      // 가게 운영시간으로 자동 채우기
      setStartTime(defaultOpenTime || "");
      setEndTime(defaultCloseTime || "");
    } else {
      setStartTime("");
      setEndTime("");
    }
  };

  const isTimeValid =
    storeTimeChecked || (startTime.length === 5 && endTime.length === 5);

  const isValid =
    title.trim().length > 0 &&
    qty.trim().length > 0 &&
    Number(qty.replace(/[^0-9]/g, "")) > 0 &&
    isTimeValid;

  const submit = () => {
    const quantity = Number(qty.replace(/[^0-9]/g, "")) || 0;

    const openTime = storeTimeChecked
      ? defaultOpenTime || startTime
      : startTime;
    const closeTime = storeTimeChecked ? defaultCloseTime || endTime : endTime;

    onConfirm({
      title: title.trim(),
      quantity,
      description: desc.trim(),
      openTime,
      closeTime,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-[24px] w-[318px] px-[20px] pb-[20px] pt-[32px] flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center gap-3">
          <div className="flex w-full flex-col text-center gap-2 font-[Pretendard]">
            <h3 className="headline-long-02 text-lg font-semibold text-[#171818] mb-0">
              나눔 요청하기
            </h3>
          </div>

          <div className="w-full flex flex-col gap-5 mb-[24px]">
            {/* 제목 */}
            <div className="w-full flex flex-col gap-4">
              <span className="subhead-02 text-[#47484B]">제목</span>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
                  focus:outline-none focus:ring-0 focus-visible:border-blue-normal"
              />
            </div>

            {/* 수량 */}
            <div className="w-full flex flex-col gap-4">
              <span className="subhead-02 text-[#47484B]">수량</span>
              <Input
                value={qty}
                inputMode="numeric"
                onChange={(e) => setQty(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="수량을 입력하세요"
                className="body-02 !h-11 text-gray-900 border border-gray-200 rounded-lg px-4 py-[15px] placeholder:text-gray-400
                  focus:outline-none focus:ring-0 focus-visible:border-blue-normal"
              />
            </div>

            {/* 설명 (선택, 500자 제한) */}
            <div className="subhead-02 text-gray-700 flex flex-col gap-4">
              <div className="flex justify-between">
                <span>
                  설명 <span className="text-gray-400">(선택)</span>
                </span>
                <span className="text-xs text-gray-400">
                  <span className="text-[#3CADFF]">{desc.length}</span>/
                  {MAX_DESC_LEN}
                </span>
              </div>
              <textarea
                value={desc}
                onChange={handleDescChange}
                maxLength={MAX_DESC_LEN}
                placeholder="사장님에게 필요한 이유 등 설명을 적어주세요 (최대 500자)"
                className="body-02 h-[100px] p-4 text-gray-900 placeholder:text-gray-400 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-blue-normal"
              />
            </div>

            {/* 거래가능 시간대 */}
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
                      placeholder:text-gray-400 focus:outline-none focus-visible:border-blue-normal
                      ${
                        storeTimeChecked
                          ? "bg-gray-100 text-gray-200"
                          : "text-gray-900"
                      }`}
                  />
                </div>
                <span className="body-02 flex items-center text-gray-400">
                  ~
                </span>
                <div className="flex-1 min-w-0">
                  <TimeInput
                    value={endTime}
                    onChange={setEndTime}
                    placeholder="19:00"
                    disabled={storeTimeChecked}
                    className={`body-02 w-full !h-11 border border-gray-200 rounded-lg px-4 py-[15px]
                      placeholder:text-gray-400 focus:outline-none focus-visible:border-blue-normal
                      ${
                        storeTimeChecked
                          ? "bg-gray-100 text-gray-200"
                          : "text-gray-900"
                      }`}
                  />
                </div>
              </div>

              <div className="flex flex-row items-center gap-[6px]">
                <Checkbox
                  id="store-time"
                  checked={storeTimeChecked}
                  onCheckedChange={(v) => handleStoreTimeToggle(!!v)}
                  className="w-[18px] h-[18px] border border-gray-200 rounded-xs data-[state=checked]:bg-blue-normal data-[state=checked]:border-blue-normal"
                />
                <label
                  htmlFor="store-time"
                  className="subhead-02 text-gray-700"
                >
                  가게 운영시간과 동일
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 w-full h-[48px] subhead-03">
          <Button
            onClick={onClose}
            className="rounded-[12px] flex-1 h-[48px] bg-[#DDF0FF] text-[#0C3756] font-semibold text-[16px]"
          >
            아니오
          </Button>
          <Button
            disabled={!isValid}
            onClick={submit}
            className="rounded-[12px] flex-1 h-[48px] text-white font-semibold text-[16px] bg-[#3CADFF] disabled:opacity-100"
          >
            요청하기
          </Button>
        </div>
      </div>
    </div>
  );
};
