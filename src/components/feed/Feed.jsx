import { Link } from "react-router-dom";

const Feed = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div className="article-preview" key={index}>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} alt="" />
            </Link>
            <div className="info">
              <Link
                className="author"
                to={`/profiles/${article.author.username}`}
              >
                {article.author.username}
              </Link>
              <span className="date">{article.createdAt}</span>
            </div>
          </div>
          <Link className="preview-link" to={`/articles/${article.slug}`}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <span>Read more...</span>
            <ul className="tag-list">
              {article.tagList.map((tag) => (
                <li key={tag} className="tag-default tag pill tag-outline">
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Feed;
