import RegisterLayout from "@/components/layouts/RegisterLayout";
import { AIMatchingModal } from "@/components/register/AiMatchingModal";
import { ReceiveRegisterForm } from "@/components/register/ReceiveRegisterForm";
import { useState } from "react";

export const RegisterReceive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <RegisterLayout header={"나눔 받기"}>
      <div className="flex flex-col px-5 pt-8 gap-16">
        {/* 입력폼 */}
        <ReceiveRegisterForm onSubmit={() => setIsModalOpen(true)} />
      </div>
      <AIMatchingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </RegisterLayout>
  );
};
