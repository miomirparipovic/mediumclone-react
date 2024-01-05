import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const baseUrl = "https://api.realworld.io/api";

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      },
    };

    axios(baseUrl + url, requestOptions)
      .finally(() => {
        setIsLoading(false);
      })
      .then((res) => {
        console.log("res", res);
        setResponse(res.data);
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.response.data);
      });
  }, [isLoading, options, token, url]);

  return [{ isLoading, response, error }, doFetch];
}
