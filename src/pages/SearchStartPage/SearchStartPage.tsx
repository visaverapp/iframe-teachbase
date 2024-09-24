import {SearchInput} from "@/components/SearchInput/SearchInput";
import searchStartIcon from '../../components/SVGIcons/SearchStartIcon.svg'

const SearchStartPage = () => {

  const startSearchPageSettings = {
    inputWidth: 'w-[706px]',
    suggetionsPosition: 'top-[27%] w-[706px]',
    navigatePath: '/search'
  }

  return (
      <div className='mt-[10%] w-[1000px]'>
        <div className='mb-[33%]'>
          <SearchInput startSearchPageSettings={startSearchPageSettings}/>
        </div>
        <div className='flex justify-end'>
          <img src={searchStartIcon} alt="searchStartIcon"/>
        </div>
      </div>
  );
};

export default SearchStartPage;