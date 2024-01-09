import { useEffect, useContext } from "react";
import useFetch from "./hooks/useFetch";
import { CurrentUserContext } from "./contexts/currentUserProvider";
import useLocalStorage from "./hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContext);
  const [{ response }, doFetch] = useFetch("/user");
  const [token] = useLocalStorage("token");

  // console.log("response", response);

  useEffect(() => {
    // console.log("make only once");
    if (!token) {
      dispatch({ type: "setUnauthorized" });
      return;
    }

    doFetch();
    dispatch({ type: "loading" });
  }, [doFetch, dispatch, token]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({ type: "setAuthorized", payload: response.user });
  }, [response, dispatch]);

  return children;
};

export default CurrentUserChecker;
