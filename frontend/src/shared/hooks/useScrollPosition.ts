import { useEffect, useState } from "react";

const useScrollPosition = (threshold: number = 200) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > threshold);
    };

    // 초기 스크롤 위치 체크
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isVisible;
};

export default useScrollPosition;
