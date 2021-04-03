import React, { useEffect, useState } from "react";
import { proxy_url } from "./data";

/** Universal fetch with GET method and error and loading state */
const useDataApi = (url) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("url", url);
    fetch(proxy_url +url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(
        (res) => {
          setIsLoaded(true);
          setData(res);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []); // Runs once

  return [data, isLoaded, error];
};

export default useDataApi;
