import { Routes, Route } from "react-router-dom";
import Article from "./views/article/Article";
import GlobalFeed from "./views/global-feed/GlobalFeed";
import Authentication from "./views/authentication/Authentication";
import TagFeed from "./views/tag-feed/TagFeed";
import YourFeed from "./views/your-feed/YourFeed";
import CreateArticle from "./views/create-article/CreateArticle";
import EditArticle from "./views/edit-article/EditArticle";
import Settings from "./views/settings/Settings";
import UserProfile from "./views/user-profile/UserProfile";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/articles/new" element={<CreateArticle />} />
      <Route path="/articles/:slug/edit" element={<EditArticle />} />
      <Route path="/tags/:slug" element={<TagFeed />} />
      <Route path="/feed" element={<YourFeed />} />
      <Route path="/profiles/:slug" element={<UserProfile />} />
      <Route path="/profiles/:slug/favorites" element={<UserProfile />} />
      <Route path="/login" element={<Authentication />} />
      <Route path="/register" element={<Authentication />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<GlobalFeed />} />
    </Routes>
  );
};

export default PageRoutes;
