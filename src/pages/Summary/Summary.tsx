import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useGetDocsQuery, useLazyGetDocsQuery} from "@/api";
import {Download} from "@/components/SVGIcons/Download";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import Markdown from "markdown-to-jsx";

interface SummaryProps {
  videoId: string
}

export const Summary = ({videoId}: SummaryProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false)
  const [isChangedHeight, setIsChangedHeight] = useState(false);

  const { data, isLoading } = useGetDocsQuery({ videoPublicId: videoId ?? '' });

  useEffect(() => {
    if (location.state?.fromSearch) {
      setIsChangedHeight(true);
    } else {
      setIsChangedHeight(false);
    }
  }, [location]);

  const [getDocs] = useLazyGetDocsQuery();

  const getSummaryHandle = async () => {
    setLoading(true)
    try {
      const summaryLink = await getDocs({
        videoPublicId: videoId || '',
      }).unwrap();

      const a = document.createElement('a');
      a.href = summaryLink.pdfFile;
      a.target = '_blanc';
      a.download = `${videoId}.pdf`;

      a.click();
      setLoading(false)
    } catch (e) {
      setLoading(false)

      // showNotification({ text: `Не получилось скачать конспект. Попробуйте чуть позже`, severity: 'error' });
    }
  };

  // const onCollapsedClick = () => {
  //   setIsCollapsed(!isCollapsed)
  //   onChange(isCollapsed)
  // }

 const cleanedMarkdown = data && data.markdown?.replace(/\n{2,}---\n{2,}/g, '\n\n');

  return (
      <div
          className={`${!isChangedHeight ? 'h-[96vh]' : 'h-[88vh]'} w-[650px] bg-white pt-[8px] pb-[16px] pl-[16px] pr-[8px] rounded-[12px] border border-white-active`}>
        {isLoading && <FullScreenLoader />}
        <div className={`${!isChangedHeight ? 'h-[93vh]' : 'h-[85vh]'} relative scroll-bar overflow-y-scroll`}>
          <div className='absolute right-0'>
            <button onClick={() => getSummaryHandle()} disabled={loading}
                 className='hover:bg-green-hover disabled:bg-green-hover cursor-pointer w-[40px] h-[40px] bg-[#00B856] rounded-[13px] content-evenly pl-[8px]'>
              <Download/>
            </button>
          </div>
          <div className='w-[590px]'>
            {cleanedMarkdown && (
                <Markdown options={{
                  forceBlock: true
                }}>{cleanedMarkdown}</Markdown>
            )}

          </div>
          {/*<div className='fixed bottom-[5%] right-[3%]'>*/}
          {/*<span className='cursor-pointer text-[#6F42C1] font-open-sans font-normal text-[14px]'*/}
          {/*      onClick={onCollapsedClick}>*/}
          {/*  {isCollapsed ? 'Развернуть' : 'Свернуть'}*/}
          {/*</span>*/}
          {/*</div>*/}
        </div>
      </div>
  );
};