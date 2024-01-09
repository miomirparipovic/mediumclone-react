import { useState, useEffect, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import ArticleForm from "../../components/article-form/ArticleForm";
import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../contexts/currentUserProvider";

const EditArticle = () => {
  const { slug } = useParams();
  const apiUrl = `/articles/${slug}`;
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl);
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [initialValues, setInitialValues] = useState(null);

  const onSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList.join(" "),
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }

    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse]);

  if (currentUserState.isLoggedIn === null) {
    return null;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Navigate replace to="/" />;
  }

  if (isSuccessfulSubmit) {
    return <Navigate replace to={`/articles/${slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(updateArticleError && updateArticleError.errors) || {}}
      />
    </div>
  );
};

export default EditArticle;
