import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import TagList from "../../components/tag-list/TagList";

const Article = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch]);
  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <ErrorMessage />}
        {!isLoading && response && (
          <div className="row article-content">
            <div>
              <p>{response.article.body}</p>
            </div>
            <TagList tags={response.article.tagList} />
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Article;
