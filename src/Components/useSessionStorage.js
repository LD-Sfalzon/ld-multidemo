import { useState, useEffect } from "react";

function getSessionStorageValue(key, defaultValue) {
  // getting stored value
  const saved = sessionStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    console.log("reading session storage values");
    return getSessionStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    console.log("storing session storage values");
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};