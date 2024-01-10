import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import { getPaginator, LIMIT, objectToQueryString } from "../../../../utils";
import Loading from "../../../../components/loading/Loading";
import ErrorMessage from "../../../../components/error-message/ErrorMessage";
import Feed from "../../../../components/feed/Feed";
import Pagination from "../../../../components/pagination/Pagination";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? {
        limit: LIMIT,
        offset,
        favorited: username,
      }
    : {
        limit: LIMIT,
        offset,
        author: username,
      };

  return `/articles?${objectToQueryString(params)}`;
};

const UserArticles = ({ location, username, url }) => {
  const isFavorites = location.pathname.includes("favorites");
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites, currentPage]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={LIMIT}
            currentPage={currentPage}
            url={url}
          />
        </>
      )}
    </div>
  );
};

export default UserArticles;
