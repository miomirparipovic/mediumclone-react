import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import ArticleForm from "../../components/article-form/ArticleForm";
import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../contexts/currentUserProvider";

const CreateArticle = () => {
  const apiUrl = "/articles";
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);

  // console.log("response", response);

  const onSubmit = (article) => {
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: "",
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessfulSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === null) {
    return null;
  }

  if (currentUserState.isLoggedIn === false) {
    return <Navigate replace to="/" />;
  }

  if (isSuccessfulSubmit) {
    return <Navigate replace to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
      />
    </div>
  );
};

export default CreateArticle;
