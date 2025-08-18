import ChevronLeft from "@/assets/icons/manage/chevron-left.svg?react";
import { useNavigate } from "react-router-dom";

interface RegisterLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
  backgroundColor?: string;
}

export default function RegisterLayout({
  children,
  header,
  backgroundColor = "bg-white",
}: RegisterLayoutProps) {
  const navigate = useNavigate();
  return (
    <div className={`h-100dvh flex flex-col ${backgroundColor}`}>
      <header
        className={`fixed top-0 w-full flex text-xl font-semibold justify-center px-5 py-[14px] text-gray-900 ${backgroundColor}`}
      >
        <div
          className="absolute left-5"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeft />
        </div>
        {header}
      </header>
      <main className="mt-16">{children}</main>
    </div>
  );
}
