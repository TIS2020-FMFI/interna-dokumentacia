import {useEffect, useState} from "react";

export default function useSession(key, value) {

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [value]);

  return useState(sessionStorage.getItem(key));
}