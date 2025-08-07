import MainLayout from "@/components/layouts/MainLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/AppSidebar";
import ChevronDown from "@/assets/icons/home/chevron-down.svg?react";
import { ProductList } from "@/components/productList/ProductList";
import { HomeBottom } from "@/components/home/bottom/HomeBottom";

export default function Home() {
  return (
    <MainLayout>
      <SidebarProvider>
        <AppSidebar />
        <header className="w-full h-11 flex flex-row items-center justify-between py-[14px]">
          <div className="flex flex-row items-center text-xl font-semibold gap-[6px]">
            공릉 1동
            <ChevronDown />
          </div>
          <SidebarTrigger />
        </header>
      </SidebarProvider>
      <ProductList />
      <HomeBottom />
    </MainLayout>
  );
}
