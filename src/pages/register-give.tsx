import RegisterLayout from "@/components/layouts/RegisterLayout";
import { GiveRegisterForm } from "@/components/register/GiveRegisterForm";
import { Button } from "@/components/ui/button";
import Camera from "@/assets/icons/register/camera.svg?react";
import { AIGeneratingModal } from "@/components/register/AiGeneratingModal";
import { useState } from "react";

export const RegisterGive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <RegisterLayout header={"나눔 주기"}>
      <div className="flex flex-col px-5 pt-11 gap-16">
        {/* 사진 section */}
        <div className="flex flex-col gap-5">
          {/* 카메라 버튼 */}
          <div className="w-[78px] flex flex-col gap-[6px] items-center px-[26px] py-[17px] text-gray-400 border border-gray-200 rounded-lg">
            <Camera />
            <div className="subhead-02 flex flex-row">
              {/* 사진 개수 */}
              <span className="text-blue-normal-hover">0</span>
              <span>/10</span>
            </div>
          </div>

          <Button
            className="w-[162px] h-11 subhead-03 border bg-white text-blue-normal border-blue-normal hover:bg-gray-100 rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            AI로 작성하기
          </Button>
        </div>
        {/* 입력폼 */}
        <GiveRegisterForm />
      </div>
      <AIGeneratingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </RegisterLayout>
  );
};
