import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  hasNext: boolean;
  nextCursor?: string;
  fetchNextPage: () => void;
  scrollEnabled?: boolean;
}

/**
 * IntersectionObserver를 사용한 무한스크롤 훅
 * 다른 도메인에서도 재사용 가능하도록 추상화됨
 */
const useInfiniteScroll = ({
  hasNext,
  nextCursor,
  fetchNextPage,
  scrollEnabled = true,
}: UseInfiniteScrollProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNext && nextCursor && scrollEnabled) {
        fetchNextPage();
      }
    },
    [hasNext, nextCursor, fetchNextPage, scrollEnabled]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    // 새로운 observer 생성
    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.1,
      rootMargin: "20px",
    });

    observerRef.current.observe(target);

    // 정리 함수 - useEffect가 다시 실행되거나 컴포넌트가 언마운트될 때 자동 호출
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersect]);

  return { targetRef };
};

export default useInfiniteScroll;
