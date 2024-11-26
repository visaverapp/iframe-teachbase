import {
  SearchVideoCardWithScreenShot
} from "@/pages/Search/components/SearchVideoCardWithScreenShots/SearchVideoCardWithScreenShot";
import {VideoWithFragments} from "@/types/playlistTypes";

interface ResultVideoInnerWithScreenShotProps {
  fragments: VideoWithFragments[]
}

export const ResultVideoInnerWithScreenShot = ({fragments}: ResultVideoInnerWithScreenShotProps) => {
  return (
      <div>
        {fragments && fragments.map((fragment, i) => (
            <SearchVideoCardWithScreenShot key={i} videoInfo={fragment} />
        ))}
      </div>
  );
};