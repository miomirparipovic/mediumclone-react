import { useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import UserArticles from "./components/user-articles/UserArticles";

const UserProfile = () => {
  const { slug } = useParams();
  const apiUrl = `/profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl);
  const location = useLocation();

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (!response) {
    return null;
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img className="user-img" src={response.profile.image} alt="" />
              <h4>{response.profile.username}</h4>
              <p>{response.profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <NavLink
                    to={`/profiles/${slug}/favorites`}
                    end
                    className="nav-link"
                  >
                    My Favorites
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/profiles/${slug}`} end className="nav-link">
                    User Articles
                  </NavLink>
                </li>
              </ul>
            </div>
            <UserArticles
              username={response.profile.username}
              location={location}
              url={location.pathname}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
