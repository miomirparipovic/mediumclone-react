import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { CurrentUserContext } from "../../contexts/currentUserProvider";
import Feed from "../../components/feed/Feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/pagination/Pagination";
import PopularTags from "../../components/popular-tags/PopularTags";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import { LIMIT, getPaginator, objectToQueryString } from "../../utils";
import FeedToggler from "../../components/feed-toggler/FeedToggler";

const GlobalFeed = () => {
  const location = useLocation();
  // const match = useMatch("/");
  // const [currentUserState] = useContext(CurrentUserContext);
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = objectToQueryString({
    limit: LIMIT,
    offset,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  // console.log("res", response, error, isLoading);
  console.log("globalFeed", location);
  console.log("getpaginator", getPaginator(location.search));
  console.log("stringified", stringifiedParams);

  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch]);

  // console.log("current user state from globalfeed", currentUserState);
  return (
    <div className="home-page">
      <div className="banner">
        <h1>Medium Clone</h1>
        <p>A place to share knowledge.</p>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={LIMIT}
                  currentPage={currentPage}
                  url={location.pathname}
                />
              </>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
