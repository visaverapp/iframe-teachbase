import {Summary} from "@/pages/Summary/Summary";
import {VideoPage} from "@/pages/VideoPage/VideoPage";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {ButtonPrevResult} from "@/components/ButtonPrevResult/ButtonPrevResult";
import {SearchInput} from "@/components/SearchInput/SearchInput";

export const VideoLayout = () => {
  const location = useLocation();
  const { videoId } = useParams();
  const [showBackButton, setShowBackButton] = useState(false);
  const baseVideoId = `${import.meta.env.VITE_VIDEO_ID}`

  useEffect(() => {
    if (location.state?.fromSearch) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [location]);


  return (
      <div>
        {showBackButton &&
            <div className='max-w-[1390px] pl-[14px] bg-white py-[12px] border-b-[1px] border-white-active flex gap-[81px] relative z-10'>
                <ButtonPrevResult/>
                <SearchInput showBackButton={showBackButton}/>
            </div>
        }
        <div className='flex gap-[14px] m-[15px]'>
          <VideoPage showBackButton={showBackButton}/>
          <Summary videoId={videoId ?? baseVideoId ?? ''}/>
        </div>
      </div>

  );
};

