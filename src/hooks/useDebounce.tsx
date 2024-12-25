import { useEffect, useState } from 'react';

export default function useDebouncer(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounceValue;
}
