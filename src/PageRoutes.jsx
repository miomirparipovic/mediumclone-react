import { Routes, Route } from "react-router-dom";
import Article from "./views/article/Article";
import GlobalFeed from "./views/global-feed/GlobalFeed";
import Authentication from "./views/authentication/Authentication";
import TagFeed from "./views/tag-feed/TagFeed";
import YourFeed from "./views/your-feed/YourFeed";
import CreateArticle from "./views/create-article/CreateArticle";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/articles/new" element={<CreateArticle />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/feed" element={<YourFeed />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/" element={<GlobalFeed />} />
    </Routes>
  );
};

export default PageRoutes;
