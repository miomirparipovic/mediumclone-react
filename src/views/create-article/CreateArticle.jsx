import ArticleForm from "../../components/article-form/ArticleForm";

const CreateArticle = () => {
  const onSubmit = (data) => {
    console.log("data", data);
  };

  const initialValues = {
    title: "foo",
    description: "bar",
    body: "baz",
    tagList: "tag",
  };

  const errors = {};

  return (
    <div>
      <ArticleForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        errors={errors}
      />
    </div>
  );
};

export default CreateArticle;
