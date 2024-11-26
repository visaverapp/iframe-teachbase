import {createRef, RefObject, useEffect, useMemo, useRef, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "@/hooks/useDebounce";
import SearchIcon from "@/components/SVGIcons/SearchIcon";
import {ClearIcon} from "@/components/SVGIcons/ClearIcon";
import {useGetTimecodesQuery} from "@/api";

type SearchInVideoInputPropsType = {
  getSearch: (value: string) => Promise<void>
  showBackButton?: boolean
  setIsActiveInput: (value: boolean) => void
  isActiveInput: boolean
}

export const SearchInVideoInput = ({getSearch, setIsActiveInput, isActiveInput}: SearchInVideoInputPropsType) => {
  const [, setIsFocused] = useState(false);
  const [param, setParam] = useSearchParams();
  const [suggestions, setSuggestions] = useState<{ start: number | string; textTimecode: string; }[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [, setOpen] = useState(false);
  // const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const search = param.get('search') || '';

  const playlistId = "59609dd8-7ef4-4080-9cb8-3c2cab266494"
  const videoId = "5ec5bb33-9c1e-4295-8a82-ca36138da3cb"

  const {data: timecodesData} = useGetTimecodesQuery({playlistId: playlistId, videoPublicId: videoId});

  useEffect(() => {
    if (timecodesData) {
      const suggestionsList = timecodesData.map(item => ({
        start: item.start,
        textTimecode: item.text
      }));
      setSuggestions(suggestionsList)
    }
  }, [])

  useEffect(() => {
    const data = searchInputRef.current?.value || '';
    if (data) {
      getSearch(data);
    }
  }, []);

  const makeSearch = useDebounce(() => {
    const data = searchInputRef.current?.value || '';
    if (data) {
      setParam((prev) => {
        prev.set('search', data);
        return prev;
      });
      getSearch(data);
    } else {
      setParam((prev) => {
        prev.delete('search');
        return prev;
      });
    }
  }, 500);


  const handleFocus = () => {
    setIsFocused(true);
    setIsActiveInput(true)
  };

  const handleBlur = () => {
    if (searchInputRef.current && searchInputRef.current.value === '') {
      setIsFocused(false);
      setIsActiveInput(false)
    }
  };

  const onSearch = () => {
    makeSearch();
  };

  const clearInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = '';
      searchInputRef.current!.focus();
    }
    setParam('');
    setIsActiveInput(true)
  };


  const scrollToRef = (value: string, block: 'start' | 'end' | 'center' | 'nearest') => {
    const ref = refs[value].current;
    if (ref) {
      ref.scrollIntoView({behavior: 'smooth', block});
    }
  };

  // const pickSuggestion = () => {
  //   navigate(`/`);
  // };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const searchInput = searchInputRef.current;
    if (selectedSuggestion >= 0 && selectedSuggestion < suggestions.length) {
      switch (e.key) {
        case 'Escape':
          setSelectedSuggestion(-1);
          setOpen(false);
          break;
        case 'Enter':
          onSearch(); // Убедитесь, что onSearch() использует правильное значение
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (selectedSuggestion > 0) {
            setSelectedSuggestion((prev) => prev - 1);
            searchInput && (searchInput.value = suggestions[selectedSuggestion - 1].textTimecode);
            scrollToRef(suggestions[selectedSuggestion - 1].textTimecode, 'start');
          } else {
            setSelectedSuggestion(-1);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (selectedSuggestion < suggestions.length - 1) {
            setSelectedSuggestion((prev) => prev + 1);
            searchInput && (searchInput.value = suggestions[selectedSuggestion + 1].textTimecode);
            scrollToRef(suggestions[selectedSuggestion + 1].textTimecode, 'end');
          } else {
            setSelectedSuggestion(suggestions.length - 1);
          }
          break;
        default:
          break;
      }
    } else {
      setSelectedSuggestion(-1);
    }
  };

  const refs = useMemo(
      () =>
          suggestions.reduce((acc, item) => {
            acc[item.textTimecode] = createRef<HTMLLIElement>();
            return acc;
          }, {} as Record<string, RefObject<HTMLLIElement>>),
      [suggestions],
  );

  return (
      <div className='flex gap-[10px] h-[40px]'>
        <div className='relative'>
          <input
              type="text"
              onKeyDown={onKeyDown}
              defaultValue={search}
              ref={searchInputRef}
              onChange={onSearch}
              onBlur={handleBlur}
              onFocus={handleFocus}
              placeholder='Что ищем в этом видео?'
              className={`${isActiveInput ? 'w-[711px]' : 'w-[457px]'} focus:outline-none focus:border-light-gray self-end pl-[16px] pr-[45px] pt-[7px] pb-[7px] border-white-active border-[1px] rounded-[10px] text-[16px] text-dark-blue`}
          />
          {!isActiveInput ?
              <div className='absolute right-[2%] top-[25%]'>
                <SearchIcon/>
              </div>
              : <div onClick={clearInput} className='cursor-pointer absolute right-[3%] top-[35%]'>
                <ClearIcon/>
              </div>
          }
        </div>
        {/*{suggestions.length > 0 && isActiveInput && (*/}
        {/*    <SuggestionSearchWrapper>*/}
        {/*      <SuggestionsList>*/}
        {/*        {suggestions.map((suggestion, i) => (*/}
        {/*            <SuggestionsItem*/}
        {/*                key={suggestion.start}*/}
        {/*                onClick={(e) => {*/}
        {/*                  e.stopPropagation();*/}
        {/*                  pickSuggestion();*/}
        {/*                }}*/}
        {/*                selected={selectedSuggestion === i}*/}
        {/*                ref={refs[suggestion.textTimecode]}*/}
        {/*                onMouseEnter={() => {*/}
        {/*                  setSelectedSuggestion(i);*/}
        {/*                }}*/}
        {/*            >*/}
        {/*              <div className='flex gap-2'>*/}
        {/*                <span*/}
        {/*                    className='text-[#00B856] text-[14px] font-open-sans font-semibold'>{secondsToTime(suggestion.start)}</span>*/}
        {/*                <LabelText*/}
        {/*                    dangerouslySetInnerHTML={{__html: highlightText(suggestion.textTimecode.slice(0, 150), searchInputRef.current!.value)}}/>*/}
        {/*              </div>*/}
        {/*            </SuggestionsItem>*/}
        {/*        ))}*/}
        {/*      </SuggestionsList>*/}
        {/*    </SuggestionSearchWrapper>*/}
        {/*)}*/}
      </div>
  );
};

// export const highlightText = (text: string, search: string) => {
//   const regex = new RegExp(`(${search})`, 'gi');
//   return text.replace(regex, '<b class="color-highlightText">$1</b>');
// };