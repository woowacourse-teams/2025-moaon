import { useEffect, useRef } from "react";

export const useIsMountedRef = () => {
  const ref = useRef({ isMounted: false }).current;

  useEffect(() => {
    ref.isMounted = true;

    return () => {
      ref.isMounted = false;
    };
  }, [ref]);

  return ref;
};
