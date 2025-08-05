import { useEffect, useRef } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router";
import { GA_EVENT } from "../constants";

const normalizePath = (pathname: string) => {
  if (/^\/detail\/\d+/.test(pathname)) {
    return "/detail/[id]";
  }

  return pathname;
};

const useTrackPageTimeGA = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);
  const startTimeRef = useRef(Date.now());
  const isFirstRunRef = useRef(true);

  useEffect(() => {
    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      return;
    }

    const now = Date.now();
    const stayTime = now - startTimeRef.current;

    if (prevPathRef.current !== location.pathname) {
      ReactGA.event({
        ...GA_EVENT.USER_ENGAGEMENT_TIME_STAY_PER_PAGE,
        label: normalizePath(prevPathRef.current),
        value: stayTime / 1000,
      });

      prevPathRef.current = location.pathname;
      startTimeRef.current = now;
    }
  }, [location.pathname]);
};

export default useTrackPageTimeGA;
