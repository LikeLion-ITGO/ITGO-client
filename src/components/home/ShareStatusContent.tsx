import { ShareBanner } from "./ShareBanner";
import { ShareDescription } from "./ShareDescription";

export const ShareStatusContent = () => {
  return (
    <div className="w-full flex flex-col mt-2 gap-4">
      <ShareBanner />
      <ShareDescription />
    </div>
  );
};
