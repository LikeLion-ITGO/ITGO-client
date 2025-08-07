import ManageLayout from "@/components/layouts/ManageLayout";
import { useState } from "react";
import ReceivedRequestContent from "@/components/manage/ReceivedRequestContent";
import SentRequestContent from "@/components/manage/SentRequestContent";
import { ReceiveShareStatus } from "@/constants/status";

export default function Manage() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <ManageLayout
      title={"나눔현황"}
      category={["받은 요청", "보낸 요청"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      {selectedTab === 0 ? (
        <ReceivedRequestContent />
      ) : (
        <SentRequestContent
          receive_status={ReceiveShareStatus.SHARING_CONFIRMED}
        />
        // <SentRequestContent
        //   receive_status={ReceiveShareStatus.MATCHING_IN_PROGRESS}
        // />
      )}
    </ManageLayout>
  );
}
