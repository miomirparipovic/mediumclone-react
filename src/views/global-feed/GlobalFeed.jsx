import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserProvider";

const GlobalFeed = () => {
  const [currentUserState, setCurrentUserState] =
    useContext(CurrentUserContext);

  console.log("current user state from globalfeed", currentUserState);
  return <div>GlobalFeed</div>;
};

export default GlobalFeed;
