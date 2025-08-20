import RegisterLayout from "@/components/layouts/RegisterLayout";
import { AIMatchingModal } from "@/components/register/AiMatchingModal";
import { ReceiveRegisterForm } from "@/components/register/ReceiveRegisterForm";
import { postWishMatch } from "@/types/wish";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterReceive = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const submitWish = async (payload: Parameters<typeof postWishMatch>[0]) => {
    setIsModalOpen(true);
    try {
      const { data } = await postWishMatch(payload, { radiusKm: 3, size: 10 });
      navigate("/ai-recommend", {
        state: { wishId: data.data.wishId, matches: data.data.matches },
        replace: true,
      });
    } catch (e) {
      navigate("/ai-recommend", { state: { matches: [] }, replace: true });
      console.error(e);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <RegisterLayout header={"나눔 받기"}>
      <div className="flex flex-col px-5 pt-8 gap-16">
        {/* 입력폼 */}
        <ReceiveRegisterForm onSubmit={submitWish} />
      </div>
      <AIMatchingModal
        open={isModalOpen}
        // onClose={() => setIsModalOpen(false)}
        onClose={() => {}}
      />
    </RegisterLayout>
  );
};
