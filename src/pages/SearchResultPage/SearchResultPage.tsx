import {Tabs} from "@/components/Tabs/Tabs";
import {Toggle} from '@/components/Toggle/Toggle';
import {useMemo, useRef, useState} from "react";
import {
  ResultVideoInnerWithScreenShot
} from "@/pages/Search/components/ResultVideoInnerWithScreenShot/ResultVideoInnerWithScreenShot";
import {SearchVideoCard} from "@/pages/SearchResultPage/SearchVideoCard";
import {playlistsAPI} from "@/api";
import {useSearchParams} from "react-router-dom";

export const SearchResultPage = () => {
  const [params] = useSearchParams();
  const [isChecked] = useState(false)
  const [activeTab, setActiveTab] = useState(0);
  const [toggleActive, setToggleActive] = useState(false);
  const search = useRef<HTMLInputElement | null>(null);
  const playlistId = `${import.meta.env.VITE_PLAYLIST_ID}`

  const {data: playlists} = playlistsAPI.useGetPlaylistByIdQuery({id: playlistId})
  const videos = playlists && playlists.videos

  const {data: fragments} = playlistsAPI.useGetFullSearchInPlaylistQuery({
    publicId: playlistId,
    query: search.current?.value || params.get("search") || ""
  }, {skip: !playlistId});

  const countFragments = useMemo(() => {
    if (!fragments) return 0;
    return fragments.reduce((total, fragment) => {
      return total + (fragment.cues?.length || 0);
    }, 0);
  }, [fragments]);

  const searchItemCountAll = `${videos && fragments ? videos.length + countFragments : ''}`
  const tabs = [`Все (${toggleActive && params.get('search') ? fragments ? countFragments : 0 :searchItemCountAll})`, `Фрагменты (${countFragments})`, `Видео (${toggleActive && params.get('search') ? 0 : videos ? videos.length : 0})`]

  return (
      <div className='pt-[12px]'>
        <div>
          <div className='absolute left-[18%] top-[12%]'>
            <Toggle title='Искать по точному совпадению' checked={isChecked} onChange={() => setToggleActive(prevState => !prevState)}/>
          </div>
          <Tabs tabsLabel={tabs} activeTab={activeTab} onChange={(index: number) => setActiveTab(index)}/>
        </div>
        <div className='relative flex flex-col scroll-bar overflow-y-scroll'>
          {activeTab === 0 ?
              <div>
                <ResultVideoInnerWithScreenShot fragments={fragments ?? []}/>
                {!toggleActive ? videos?.map(video => <SearchVideoCard key={video.publicId}
                                                                                         video={video}/>) : <></>}
                {toggleActive && !params.get('search') && videos?.map(video => <SearchVideoCard key={video.publicId}
                                                                                         video={video}/>)}
              </div>
              :
              activeTab === 1 ? <ResultVideoInnerWithScreenShot fragments={fragments ?? []}/>
                  : activeTab === 2 ? <>{!toggleActive ? videos?.map(video => <SearchVideoCard key={video.publicId}
                                                                                         video={video}/>) : <></> }</>
                      : <></>
          }
        </div>
        {toggleActive && fragments?.length === 0 && <div className='pl-[14rem] pb-[14rem] w-max mt-12'>Подходящих видео и фраментов не найдено</div>}
      </div>
  );
};

