import { ReceiveHistoryContent } from "@/components/history/ReceiveHistoryContent";
import { SendHistoryContent } from "@/components/history/SendHistoryContent";
import ManageLayout from "@/components/layouts/ManageLayout";
import { useState } from "react";

export default function History() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ManageLayout
      title={"거래내역"}
      category={["나눔한 내역", "나눔 받은 내역"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      {selectedTab === 0 ? <SendHistoryContent /> : <ReceiveHistoryContent />}
    </ManageLayout>
  );
}
