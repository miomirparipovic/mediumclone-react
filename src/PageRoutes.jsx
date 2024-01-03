import { Routes, Route } from "react-router-dom";
import Article from "./views/article/Article";
import GlobalFeed from "./views/global-feed/GlobalFeed";
import Authentication from "./views/authentication/Authentication";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/" element={<GlobalFeed />} />
    </Routes>
  );
};

export default PageRoutes;
