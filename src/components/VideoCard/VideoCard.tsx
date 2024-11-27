import {memo, useCallback, useImperativeHandle} from "react";

import ReactPlayer from "react-player";
import {useSearchParams} from "react-router-dom";

interface VideoCardProps {
  video: any
  iframeClassName: string
  setCurrentTime?: any
  startsForm?: number
  iframe?: any
  height: string;
  ref?: any
  hasInitialized?: any
  iframeWrapper?: any
  onStateChange?: any
  goToTimeFunc?: any
  url: string;
}

export const VideoCard = memo(({goToTimeFunc,ref, hasInitialized, iframeWrapper, video, height,url, setCurrentTime, iframeClassName, iframe, startsForm}:VideoCardProps) => {
  const [params] = useSearchParams();

  const onPlayerReady = useCallback(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    const tParam = params.get('t');
    const startTime = tParam ? parseInt(tParam.replace(/\D/g, ''), 10) : startsForm;

    if (startTime !== undefined && !isNaN(startTime)) {
      goToTimeFunc(startTime);
    }
  }, [params, startsForm, goToTimeFunc]);

  useImperativeHandle(
    ref,
    () => ({
      goToTime: goToTimeFunc,
    }),
    [goToTimeFunc],
  );

  return (
      <div className={iframeClassName} ref={iframeWrapper}>
        {video && (
          <ReactPlayer
            ref={iframe}
            url={url}
            playing={false}
            controls={true}
            width="100%"
            height={height}
            progressInterval={1000}
            onReady={onPlayerReady}
            // opts={{
            //   playerVars: {
            //     start: startsForm || video.startsForm,
            //   },
            // }}
            onProgress={({playedSeconds}) => {
              setCurrentTime?.(playedSeconds);
            }}
          />
            // <YouTube iframeClassName={iframeClassName}
            //          videoId={video.videoId}
            //          title={video.title}
            //          ref={iframe}
            //          onStateChange={onStateChange}
            //          onReady={goToTimeFunc}
            //          opts={{
            //            playerVars: {
            //              start: video.startsFrom || startsForm,
            //              autoplay: 0,
            //              rel: 0,
            //            },
            //          }}
            // />
        )}
      </div>
  );
})

