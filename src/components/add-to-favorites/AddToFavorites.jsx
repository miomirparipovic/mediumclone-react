import useFetch from "../../hooks/useFetch";

const AddToFavorites = ({ isFavorited, favoritesCount, articleSlug }) => {
  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;

  const handleLike = (event) => {
    event.preventDefault();
    doFetch({
      method: isFavoritedWithResponse ? "delete" : "post",
    });
  };

  return (
    <button
      className={`btn btn-sm pull-xs-right ${
        isFavoritedWithResponse ? "btn-primary" : "btn-outline-primary"
      }`}
      onClick={handleLike}
    >
      <i className="ion-heart"></i>
      &nbsp;{favoritesCountWithResponse}
    </button>
  );
};

export default AddToFavorites;
