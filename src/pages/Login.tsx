import { InputEdit } from "@/components/InputEdit";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  return (
    <MainLayout bgcolor="white">
      <div className="mt-[60px] mb-[205px]">
        <div className="mb-[64px]">
          <p className=" headline-02 text-[20px] mb-[6px]">안녕하세요</p>
          <p className="display-01">
            <span className="text-[#1E7BC0]">잇고</span>에 온 걸 환영해요
          </p>
        </div>
        <div className="flex flex-col gap-10 mb-[56px]">
          <div className="flex flex-col gap-4">
            <label className="subhead-02 text-[#47484B]">아이디</label>
            <InputEdit placeholder="아이디를 입력하세요" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="subhead-02 text-[#47484B]">비밀번호</label>
            <InputEdit placeholder="아이디를 입력하세요" />
          </div>
        </div>
        <div className="flex gap-4 text-[#777A7F] body-01 justify-center ">
          <p>아이디 찾기</p>
          <p className="w-[1px] h-[14px] bg-[#BCC3CE]" />
          <p>비밀번호 찾기</p>
          <p className="w-[1px] h-[14px] bg-[#BCC3CE]" />
          <p>회원가입</p>
        </div>
      </div>
      <div>
        <Button
          className="w-full h-[44px] rounded-[76px] subhead-03 text-[#FFF] bg-[#3CADFF] "
          onClick={() => navigate(ROUTES.HOME)}
        >
          로그인
        </Button>
      </div>
    </MainLayout>
  );
};
