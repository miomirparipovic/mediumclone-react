import { Link } from "react-router-dom";
import { range } from "../../utils";

const PaginationItem = ({ page, currentPage, url }) => {
  return (
    <li className={page === currentPage ? "page-item active" : "page-item"}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({ total, limit, url, currentPage }) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  );
};

export default Pagination;
