import { useEffect } from "react";
import ReactGA from "react-ga4";

const useInitializeGA = () => {
  useEffect(() => {
    if (!process.env.GA_API_KEY) {
      return;
    }

    ReactGA.initialize(process.env.GA_API_KEY);
  }, []);
};

export default useInitializeGA;
