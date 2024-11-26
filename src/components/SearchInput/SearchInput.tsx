import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect,KeyboardEvent, useRef, useState} from "react";
import SearchIcon from "@/components/SVGIcons/SearchIcon";
import {useDebounce} from "@/hooks/useDebounce";
import {PlayIconSuggetions} from "@/components/SVGIcons/PlayIconSuggetions";
import {FragmentPlayIconSuggetions} from "@/components/SVGIcons/FragmentPlayIconSuggetions";
import {playlistsAPI} from "@/api";
import {ClearIcon} from "@/components/SVGIcons/ClearIcon";

export type SearchInputPropsType = {
  startSearchPageSettings?: {
    inputWidth: string,
    suggetionsPosition: string
    navigatePath: string
  }
  showButtonLastVideo?: boolean
  showBackButton?: boolean
}
export const SearchInput = ({startSearchPageSettings, showButtonLastVideo, showBackButton}: SearchInputPropsType) => {

  const [params, setParams] = useSearchParams();
  const [suggetions, setSuggetions] = useState<any[]>([])
  const [, setIsFocused] = useState(false);
  const search = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isActiveInput, setIsActiveInput] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const playlistId = `${import.meta.env.VITE_PLAYLIST_ID}`

  const {data: video} = playlistsAPI.useGetFullSearchInPlaylistQuery({
    publicId: playlistId,
    query: search.current?.value || params.get("search") || ""
  });

  useEffect(() => {
    if (video) {
      const suggetionsFragment = video.map(fragment => (
          {
            fragmentText: fragment.cues[0].content,
            videoTitle: video.map(item => item.title),
            publicId: video.map(item => item.publicId),
            timestampLink: fragment.cues[0].timestampLink
          }
      ))
      const suggetionsVideo = video.map(item => item.description)
      const suggetionsList = [...suggetionsFragment, ...suggetionsVideo]
      setSuggetions(suggetionsList)
    }

    if (search.current) {
      search.current.focus();
    }

  }, [video])


  const makeSearch = useDebounce(() => {
    const data = search.current?.value || '';
    if (data) {
      setParams({search: data});
    } else {
      setParams({});
    }
  }, 500);

  const onSearch = () => {
    setOpen(true)
    makeSearch();
  };

  const pickSuggestion = (content?: string) => {
    if (location.pathname.includes('full-search') && !content) {
      navigate(`${startSearchPageSettings?.navigatePath}`);
      // navigate(`/search/?search=${content}`)
    } else if (!(location.pathname.includes('full-search')) && content) {
      navigate(`/?search=${content}`)
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && location.pathname.includes('full-search')) {
      pickSuggestion()
    } else if (e.key === "Enter" && location.pathname.includes('search')) {
      setOpen(false)
      makeSearch();
    }
  }
  const clearInput = () => {
    if (search.current) {
      search.current.value = '';
      search.current!.focus();
    }
    setParams('');
    setIsActiveInput(true)
  };

  const handleBlur = () => {
    if (search.current && search.current.value === '') {
      setIsFocused(false);
      setIsActiveInput(false)
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
    setIsActiveInput(true)
  };

  // const skipSuggetions = () => {
  //     setOpen(false)
  // };


  return (
      <div className='flex flex-col justify-center items-center gap-[48px]'>
        <div className='relative'>
          <input
              type="text"
              ref={search}
              onBlur={handleBlur}
              onFocus={handleFocus}
              onChange={onSearch}
              onKeyDown={onKeyDownHandler}
              defaultValue={params.get('search') ?? ''}
              placeholder='Что ищем в этом курсе?'
              disabled={showBackButton || showButtonLastVideo}
              className={`${startSearchPageSettings?.inputWidth ? startSearchPageSettings.inputWidth : 'w-[945px]'} ${(showBackButton || showButtonLastVideo) ? 'border-opacity-30 placeholder:opacity-35': ''} h-[40px] focus:outline-none focus:border-light-gray self-end pl-[16px] pr-[45px] pt-[7px] pb-[10px] border-[#8492A6] border-[1px] rounded-[9px] text-[16px] text-dark-blue `}
          />
          {!isActiveInput ?
              <div className={`${(showBackButton || showButtonLastVideo) ? 'opacity-30': ''} absolute right-[2%] top-[25%]`}>
                <SearchIcon/>
              </div>
              : <div onClick={clearInput} className='cursor-pointer absolute right-[3%] top-[35%]'>
                <ClearIcon/>
              </div>
          }
        </div>

        {location.pathname.includes('full-search') && suggetions.length > 0 && open && params.get('search') && (
            <div
                className={`${startSearchPageSettings?.suggetionsPosition ? startSearchPageSettings.suggetionsPosition : 'top-[62px] w-[945px]'} absolute z-[10] max-h-[312px]  bg-white border border-[#8492A6] rounded-[10px] p-[2px]`}>
              <ul className='max-h-[290px] flex-col overflow-y-scroll scroll-bar'>
                {suggetions.map(item => {
                  return (
                      <>
                        {item.content &&
                            <li onClick={()=>pickSuggestion(item.content)}
                                className='gap-1 px-[12px] py-[8px] cursor-pointer hover:bg-white-hover flex pb-1'>
                                <PlayIconSuggetions/>
                                <span
                                    className='text-dark-blue text-[16px] font-normal font-open-sans pb-[3px]'>{item.content}</span>
                            </li>
                        }
                      </>
                  )
                })}
                {suggetions.map(fragment => {
                  return (
                      <>
                        {fragment.fragmentText &&
                            <Link to={`/search/?search=${ fragment.fragmentText ?? search.current?.value}`} state={{fromSearch: true}}>
                                <li
                                    className='flex gap-1 px-[12px] py-[8px] cursor-pointer hover:bg-white-hover'>
                                    <FragmentPlayIconSuggetions/>
                                    <div className='w-fit'>
                                    <span
                                        dangerouslySetInnerHTML={{__html: highlightTextSearchPage(fragment.fragmentText, search.current!.value)}}
                                        className='text-dark-blue text-[16px] font-normal font-open-sans pb-[3px]'></span>
                                      <div className='flex items-center'>
                                          <PlayIconSuggetions/>
                                          <span className='text-[#6A6A77] text-[14px] font-normal font-open-sans'>{fragment.videoTitle[0]}</span>
                                      </div>
                                    </div>
                                </li>
                            </Link>
                        }
                      </>
                  )
                })}
              </ul>
            </div>
        )}

      </div>
  );
};

export const highlightTextSearchPage = (text: string, search: string) => {
  const regex = new RegExp(`(${search})`, 'gi');
  return text.replace(regex, '<b class="color-highlightText">$1</b>');
};