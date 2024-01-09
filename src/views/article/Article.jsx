import { useEffect, useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading/Loading";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import TagList from "../../components/tag-list/TagList";
import { CurrentUserContext } from "../../contexts/currentUserProvider";

const Article = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [
    {
      isLoading: fetchArticleIsLoading,
      response: fetchArticleResponse,
      error: fetchArticleError,
    },
    doFetch,
  ] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] =
    useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  const isAuthor = () => {
    if (currentUserState.isLoggedIn === null || !fetchArticleResponse) {
      return false;
    }

    return (
      currentUserState.currentUser?.username ===
      fetchArticleResponse.article.author.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: "delete",
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (deleteArticleResponse === null) {
      return;
    }

    setIsSuccessfulDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfulDelete) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                <img src={fetchArticleResponse.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit"></i>&nbsp;Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a"></i>
                    &nbsp;Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && fetchArticleResponse && (
          <div className="row article-content">
            <div>
              <p>{fetchArticleResponse.article.body}</p>
            </div>
            <TagList tags={fetchArticleResponse.article.tagList} />
          </div>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Article;
