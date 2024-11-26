import {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {SearchInVideoInput} from "@/components/SearchTimecodesVideoInput/SearchInVideoInput";
import {Timecodes} from "@/pages/VideoPage/Timecodes/Timecodes";
import {VideoCard} from "@/components/VideoCard/VideoCard";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import {playlistsAPI, videosAPI} from "@/api";
import {VideoFragmentCard} from "@/components/Card/VideoFragmentCard";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import ReactPlayer from "react-player";
import {Quiz} from "@/pages/QuizPage/Quiz";

interface VideoPageProps {
  showBackButton?: boolean
}

export const VideoPage = memo(({showBackButton}: VideoPageProps) => {
  const [tab, setTab] = useState(1)
  const [isActiveInput, setIsActiveInput] = useState(false)
  const [currentTime, setCurrentTime] = useState(0);
  const [showVideoCard, setShowVideoCard] = useState(true);
  const [isChangedHeight, setIsChangedHeight] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isSearchLoading] = useState(false);
  // const iframe = useRef<YouTube>(null);
  const iframe = useRef<ReactPlayer>(null);
  const iframeWrapper = useRef<HTMLDivElement>(null);
  const ref = useRef<{ goToTime: (time: number) => void } | null>(null);
  const hasInitialized = useRef(false);

  const { videoId } = useParams();
  const location = useLocation();
  const [params] = useSearchParams();
  const playlistId = `${import.meta.env.VITE_PLAYLIST_ID}`
  const baseVideoId = `${import.meta.env.VITE_VIDEO_ID}`


  useEffect(() => {
    if (location.state?.fromSearch) {
      setIsChangedHeight(true);
    } else {
      setIsChangedHeight(false);
    }
  }, [location]);

  const {
    data: video,
  } = videosAPI.useGetMovieByIdQuery({id: videoId ?? baseVideoId ?? ''});

  const [getSearchVideos, {data: searchVideos}] =
      playlistsAPI.useLazyGetFullSearchInPlaylistQuery();  //получили все видео плейлиста

  const getSearchVideosHandler = useCallback(
      async (query: string) => {
        await getSearchVideos({query, publicId: playlistId || ''});
      },
      [playlistId],
  );

  // const getCurrentTimeFunc = async () => {
  //   setCurrentTime((await iframe.current?.getCurrentTime()) || 0);
  // };
  //
  // let timerId: number;
  // const onStateChange: YouTubeProps['onStateChange'] = (event) => {
  //   if (event.data === 1) {
  //     timerId = setInterval(() => {
  //       getCurrentTimeFunc();
  //     }, 1000);
  //   } else if (event.data === 2) {
  //     clearInterval(timerId);
  //   }
  // };

  // const goToTimeFunc = (event: YouTubeEvent) => {
  //   const time = params.get('t') ?? 0;
  //   event.target.seekTo(time);
  //   event.target.playVideo();
  // };

  const goToTimeFunc = useCallback(async (time: number) => {
    if (iframe.current) {
      iframe.current.seekTo(time, 'seconds');
      const player = iframe.current.getInternalPlayer();
      if (player?.play) {
        player.play();
      }
    }
  }, []);

  // const goToTime = (time: number) => {
  //   iframe.current?.seekTo(time, "seconds");
  //   iframeWrapper.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  // }

  const goToTime = useCallback(
    (time: number) => {
      iframe.current?.seekTo(time);
      iframeWrapper.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    [video],
  );

  const startsForm = useMemo(() => {
    const time = params.get('t');
    return time ? parseInt(time) : 0;
  }, [params]);

  const showQuizVideo = (tab: number) => {
    setTab(tab)
    if (tab === 3) {
      setShowQuiz(true)
    } else {
      setShowQuiz(false)
    }
  }

  return (
    <section>
      {video && (
        <div className={`${isChangedHeight ? 'h-[88vh]' : 'h-[96vh]'} flex flex-col gap-[12px]`}>
          <div className={`${!showVideoCard ? 'mt-[-51%]' : ''}`}><VideoCard video={video}
                                                                             height={'404px'}
                                                                             iframe={iframe}
                                                                             ref={ref}
                                                                             goToTimeFunc={goToTimeFunc}
                                                                             hasInitialized={hasInitialized}
                                                                             iframeWrapper={iframeWrapper}
                                                                             startsForm={startsForm}
                                                                             url={video.originLink}
                                                                             // setCurrentTime={setCurrentTime}
                                                                             setCurrentTime={(time: number) => setCurrentTime(time)}
                                                                             iframeClassName={`${showQuiz && isChangedHeight === false ? 'mt-[-5%] z-0' : showQuiz && isChangedHeight === true ? 'mt-[-15%] z-0' : 'mt-[0px]'}  rounded-[12px] w-[100%]`}/>
            <p
              className='mt-[8px] font-open-sans font-bold text-[16px] text-dark-blue'>{video.title}</p>
          </div>


          <>
            {playlistId && (
              <>
                <div className='flex gap-[12px]'>
                  <SearchInVideoInput isActiveInput={isActiveInput}
                                      setIsActiveInput={(value) => setIsActiveInput(value)}
                                      showBackButton={showBackButton} getSearch={getSearchVideosHandler}/>
                  {!isActiveInput &&
                      <div className='flex border-white-active border-[1px] rounded-[12px] bg-white'>
                          <span
                              className={`${tab === 1 ? 'bg-green-active font-bold text-white' : 'bg-white font-normal text-dark-blue'} cursor-pointer block pl-[24px] pr-[40px] py-[8px] font-open-sans rounded-[12px] text-center w-[120px] h-[40px] text-[14px] content-evenly`}
                              onClick={() => showQuizVideo(1)}>Таймкоды</span>
                        {/*     <span
                                    className={`${tab === 2 ? 'bg-green-active font-bold text-white' : 'bg-white font-normal text-dark-blue'} cursor-pointer block px-[26px] py-[8px] font-open-sans rounded-[12px] text-center w-[120px] h-[40px] text-[14px] content-evenly`}
                                    onClick={() => showQuizVideo(2)}>Описание</span>*/}
                          <span
                              className={`${tab === 3 ? 'bg-green-active font-bold text-white' : 'bg-white font-normal text-dark-blue'} cursor-pointer block px-[26px] py-[8px] font-open-sans rounded-[12px] text-center w-[116px] h-[40px] text-[14px] content-evenly`}
                              onClick={() => showQuizVideo(3)}>Тест</span>
                      </div>
                  }
                </div>


              </>
            )}
          </>
          {tab === 1 ?
            <>
              {searchVideos && params.get('search') && (
                <div
                  className='cursor-pointer h-[100%] scroll-bar overflow-y-scroll w-[709px] rounded-[12px] border-white-active border-[1px] py-[8px] px-[16px]'>
                  {searchVideos.length === 0 && (
                    <div style={{marginTop: '20px', marginBottom: '20px'}}>
                      <span>По вашему запросу нет результатов</span>
                    </div>
                  )}
                  {searchVideos &&
                    searchVideos.map((fragment) =>
                      fragment.cues.map((cue, i) => {
                        if (fragment.publicId === video.publicId) {
                          return (
                            <div className='hover:bg-white-hover'>
                              <VideoFragmentCard
                                fragment={cue}
                                key={fragment.publicId + i}
                                goToTime={goToTime}
                                videoPreview={fragment.thumbnailUrl}
                              />
                            </div>
                          );
                        }
                      }),
                    )}
                </div>
              )}
              {isSearchLoading && <div className='mx-auto'><FullScreenLoader/></div>}
              {!params.get('search') &&
                  <Timecodes onChange={(value) => setShowVideoCard(value)} setTime={goToTime}
                             currentTime={currentTime}
                             id={video.publicId}/>}
            </>
            /*:
            tab === 2 ? <DescriptionTextVideo/>*/
            : tab === 3 ? <Quiz
              videoPublicId={videoId ?? baseVideoId ?? '' }
              goToTime={goToTime}
            /> : <></>}

        </div>
      )
      }
    </section>
  );
})
