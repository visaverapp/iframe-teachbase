import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import {Video} from "@/types/videosTypes";

interface ResultInnerProps {
  data?: Video[];
  isLoading: boolean;
}

export const ResultInner = ({ isLoading }: ResultInnerProps) => {
  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
     <></>
  );
};
