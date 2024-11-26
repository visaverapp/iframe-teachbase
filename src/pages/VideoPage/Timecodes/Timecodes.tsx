import {memo, useMemo, useState} from "react";
import {secondsToTime} from "@/pages/Search/utils";
import {useGetTimecodesQuery} from "@/api";

interface TimecodesProps {
  setTime: (time: number) => void;
  id: string;
  currentTime: number | null;
  onChange: (value: boolean)=> void
}

export const Timecodes = memo(({ setTime, id, onChange, currentTime }: TimecodesProps) => {
  const [showTextIndex, setShowTextIndex] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { data } = useGetTimecodesQuery({ videoPublicId: id ?? '' }, {skip: !id});

  const toggleText = (index: any) => {
    setShowTextIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const onReadMoreClick = () => {
    setIsCollapsed(!isCollapsed);
    onChange(isCollapsed)
  };

  const timings = useMemo(() => data?.map((array) => array.start as number) ?? [], [data]);

  const highlightChapter = (i: number) => {
    return currentTime != null && currentTime >= timings[i] && (timings[i + 1] === undefined || currentTime < timings[i + 1]);
  };

  return (
      <div
          className={`${isCollapsed ? 'h-[100%]': 'h-[100%]' } relative scroll-bar overflow-y-scroll w-[712px] rounded-[12px] border-white-active border-[1px] py-[8px] px-[8px]`}>
        {data && (
            <ol>
              {data.map(({start, text, title}, i) => (
                  <li className={`${highlightChapter(i) ? 'bg-[#E5E9F2]' : 'bg-white'} hover:bg-white-hover cursor-pointer rounded-[8px] pb-[8px] pr-[8px]`} key={i}>
                    <div onClick={() => setTime(start as number)}>
                      <span className='text-lite-green font-open-sans font-bold text-[14px] pr-[5px]'>{secondsToTime(start as number)}</span>
                      <span className={`text-dark-blue font-open-sans font-bold text-[14px]`}>{title}</span>
                    </div>
                    <div className='flex w-[670px] justify-between'>
                      <span onClick={() => setTime(start as number)}
                          className='cursor-pointer text-indigo font-open-sans font-normal text-[14px]'>
                        {showTextIndex === i ? text : text.slice(0, 85) + '...'}
                      </span>
                      <span onClick={() => toggleText(i)}
                          className='self-end cursor-pointer text-green-hover font-open-sans font-normal text-[14px]'>
                        {showTextIndex === i ? 'Свернуть' : '...ещё'}
                      </span>
                    </div>
                  </li>
              ))}
            </ol>
        )}
        <div className='relative bottom-[-1%] text-right'>
          <span className='cursor-pointer text-green-hover font-open-sans font-normal text-[14px]' onClick={onReadMoreClick}>
            {!isCollapsed ? 'Развернуть' : 'Свернуть'}
          </span>
        </div>
      </div>
  );
});

Timecodes.displayName = 'Timecodes';
