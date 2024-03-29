import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Feed from "../../components/feed/Feed";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/pagination/Pagination";
import PopularTags from "../../components/popular-tags/PopularTags";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import { LIMIT, getPaginator, objectToQueryString } from "../../utils";
import FeedToggler from "../../components/feed-toggler/FeedToggler";
import Banner from "../../components/banner/Banner";

const TagFeed = () => {
  const location = useLocation();
  const { slug } = useParams();
  const { offset, currentPage } = getPaginator(location.search);
  const stringifiedParams = objectToQueryString({
    limit: LIMIT,
    offset,
    tag: slug,
  });
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);

  // console.log("globalFeed", location);
  // console.log("getpaginator", getPaginator(location.search));
  // console.log("stringified", stringifiedParams);
  // console.log("slug", slug);

  useEffect(() => {
    doFetch();
  }, [currentPage, doFetch, slug]);

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagName={slug} />
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

export default TagFeed;
