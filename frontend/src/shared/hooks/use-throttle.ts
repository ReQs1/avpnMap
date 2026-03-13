import { useEffect, useLayoutEffect, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle<T extends (...args: any[]) => void>(
  action: T,
  delay: number = 300,
) {
  const [isThrottled, setIsThrottled] = useState(false);
  const isThrottledRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionRef = useRef(action);

  useLayoutEffect(() => {
    actionRef.current = action;
  }, [action]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const throttledAction = (...args: Parameters<T>) => {
    if (isThrottledRef.current) return;

    isThrottledRef.current = true;
    setIsThrottled(true);
    actionRef.current(...args);

    timeoutRef.current = setTimeout(() => {
      isThrottledRef.current = false;
      setIsThrottled(false);
    }, delay);
  };

  return { isThrottled, throttledAction };
}
