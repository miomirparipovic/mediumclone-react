import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const baseUrl = "https://api.realworld.io/api";

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    console.log("effect is triggered");
    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, options)
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
  }, [isLoading, options, url]);

  return [{ isLoading, response, error }, doFetch];
}
