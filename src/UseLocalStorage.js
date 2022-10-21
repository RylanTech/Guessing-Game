import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(()=> {
    const value = localStorage.getItem(key);
    if (value !== null) return JSON.parse(value)
    return defaultValue;
  })

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage