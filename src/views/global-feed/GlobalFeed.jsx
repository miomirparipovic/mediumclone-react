import { useEffect } from "react";
// import { CurrentUserContext } from "../../contexts/currentUserProvider";
import Feed from "../../components/feed/Feed";
import useFetch from "../../hooks/useFetch";

const GlobalFeed = () => {
  const apiUrl = "/articles?limit=10&offset=0";
  // const [currentUserState] = useContext(CurrentUserContext);
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  console.log("res", response, error, isLoading);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

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
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
