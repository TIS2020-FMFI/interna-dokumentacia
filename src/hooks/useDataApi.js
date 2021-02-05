import { useEffect, useState } from 'react';

const useDataApi = url => {

  const [data, setData] = useState(undefined);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('url', url)
    fetch(url, { method: "GET"} )
      .then(response => response.json())
      .then(res => {
          setIsLoaded(true);
          setData(res)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []); // Runs once

  return [data, isLoaded, error];
};

export default useDataApi;