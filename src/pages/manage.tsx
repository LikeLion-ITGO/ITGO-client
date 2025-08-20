import ManageLayout from "@/components/layouts/ManageLayout";
import { useEffect, useState } from "react";
import ReceivedRequestContent from "@/components/manage/ReceivedRequestContent";
import SentRequestContent from "@/components/manage/SentRequestContent";
import { ShareStatus } from "@/constants/status";

export default function Manage({ status }: { status: string }) {
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setSelectedTab(status === "receive" ? 0 : 1);
  }, [status]); // ✅ status 바뀔 때도 동기화

  return (
    <ManageLayout
      title={"나눔현황"}
      category={["받은 요청", "보낸 요청"]}
      route={["/manage/receive", "/manage/give"]}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      {selectedTab === 0 ? (
        <ReceivedRequestContent give_status={ShareStatus.NO_REQUEST} />
      ) : (
        // <SentRequestContent
        //   receive_status={ShareStatus.ACCEPTED}
        // />
        // <SentRequestContent receive_status={ShareStatus.NO_REQUEST} />
        <SentRequestContent receive_status={ShareStatus.PENDING} />
      )}
    </ManageLayout>
  );
}
