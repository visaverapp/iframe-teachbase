import {Route, Routes} from "react-router-dom";
import {VideoLayout} from "@/layouts/VideoLayout/VideoLayout";
import SearchStartPage from "@/pages/SearchStartPage/SearchStartPage";
import {SearchLayout} from "@/layouts/SearchLayout/SearchLayout";
import {SearchResultPage} from "@/pages/SearchResultPage/SearchResultPage";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<VideoLayout/>} />
        <Route path="full-search" element={<SearchStartPage/>}/>
        <Route path="search" element={<SearchLayout />}>
          <Route index element={<SearchResultPage/>} />
        </Route>
        <Route path=":videoId" element={<VideoLayout />} />
      </Routes>
  );
};

export default App;