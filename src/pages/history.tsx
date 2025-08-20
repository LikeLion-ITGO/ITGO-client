import { ReceiveHistoryContent } from "@/components/history/ReceiveHistoryContent";
import { SendHistoryContent } from "@/components/history/SendHistoryContent";
import ManageLayout from "@/components/layouts/ManageLayout";
import { useEffect, useState } from "react";

export default function History({ status }: { status: string }) {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(status === "give" ? 0 : 1);
  }, [status]);

  return (
    <ManageLayout
      title={"거래내역"}
      category={["나눔한 내역", "나눔 받은 내역"]}
      route={["/history/give", "/history/receive"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      {selectedTab === 0 ? (
        // 나눔한 내역
        <SendHistoryContent />
      ) : (
        // 나눔 받은 내역
        <ReceiveHistoryContent />
      )}
    </ManageLayout>
  );
}
