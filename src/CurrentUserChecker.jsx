import { useEffect, useContext } from "react";
import useFetch from "./hooks/useFetch";
import { CurrentUserContext } from "./contexts/currentUserProvider";
import useLocalStorage from "./hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [{ response }, doFetch] = useFetch("/user");
  const [token] = useLocalStorage("token");

  console.log("response", response);

  useEffect(() => {
    console.log("make only once");
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch();
    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, []);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response]);

  return children;
};

export default CurrentUserChecker;
