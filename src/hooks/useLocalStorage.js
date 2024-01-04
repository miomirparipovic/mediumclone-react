import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    console.log("value", value);
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
