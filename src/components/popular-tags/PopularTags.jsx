import { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../loading/Loading";
import ErrorMessage from "../error-message/ErrorMessage";

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch("/tags");

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {response.tags.map((tag) => (
          <Link key={tag} className="tag-default tag-pill" to={`/tags/${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
