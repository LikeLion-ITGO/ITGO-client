export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-100dvh flex flex-col px-[20px]">{children}</div>;
}
