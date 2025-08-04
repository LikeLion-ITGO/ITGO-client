import MainLayout from "@/components/layouts/MainLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/AppSidebar";

export default function Home() {
  return (
    <MainLayout>
      <SidebarProvider>
        <AppSidebar />
        <header className="w-full flex flex-row justify-between py-[14px]">
          헤더
          <SidebarTrigger />
        </header>
      </SidebarProvider>
    </MainLayout>
  );
}
