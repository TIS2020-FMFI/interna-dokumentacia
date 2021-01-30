import {useEffect, useState} from "react";

export default function useSession(key, value) {

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [value]);

  const [state, setState] = useState(sessionStorage.getItem(key))
  return [state, setState];
}