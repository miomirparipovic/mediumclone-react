import { Routes, Route } from "react-router-dom";
import Article from "./views/article/Article";
import GlobalFeed from "./views/global-feed/GlobalFeed";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/" element={<GlobalFeed />} />
    </Routes>
  );
};

export default PageRoutes;
