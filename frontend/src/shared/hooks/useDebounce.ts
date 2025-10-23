import { useEffect, useState } from "react";

interface useDebounceProps<T> {
  value: T;
  delay?: number;
}

const useDebounce = <T>({ value, delay = 300 }: useDebounceProps<T>) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
