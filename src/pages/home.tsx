import MainLayout from "@/components/layouts/MainLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/AppSidebar";
import { ProductList } from "@/components/productList/ProductList";
import EditedIcon from "@/assets/icons/storeInfoPage/Edited.svg";
import { FloatingButton } from "@/components/home/bottom/FloatingButton";
import { ShareSection } from "@/components/home/bottom/ShareSection";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShareStatusContent } from "@/components/home/ShareStatusContent";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showToast) {
      setShowToast(true);

      const newState = { ...location.state };
      delete newState.showToast;
      navigate(location.pathname, { replace: true, state: newState });

      setShowToast(true);
    }
  }, [location.state, location.pathname, navigate]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 2000);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <MainLayout>
      <SidebarProvider>
        {/* 토스트 !!*/}
        {showToast && (
          <div
            className="fixed w-[calc(100%-40px)]  bottom-5 flex justify-center items-center gap-[10px] bg-[#5F6165E5] text-white px-5 py-4 rounded-[12px] transition-transform subhead-03"
            onClick={() => setShowToast(false)}
          >
            <img src={EditedIcon} alt="완료" />
            가게 정보가 수정되었어요!
          </div>
        )}
        <AppSidebar />
        <div className="flex flex-col">
          <header className="w-full h-11 flex flex-row items-center justify-between py-[11px]">
            <div className="display-01 text-gray-900 flex flex-row items-center gap-[6px]">
              우리는 공릉동 사장님
            </div>
            <SidebarTrigger />
          </header>
          <div className="flex flex-col gap-16">
            <ShareStatusContent />
            <ProductList />
          </div>
          <ShareSection />
          <div className="flex justify-end ">
            <FloatingButton />
          </div>
        </div>
      </SidebarProvider>
    </MainLayout>
  );
}
