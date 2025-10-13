import type { PropsWithChildren } from "react";
import * as S from "./EventSection.styled";

interface EventSectionProps {
  badgeText: string;
  badgeColor: string;
}

function EventSection({
  badgeText,
  badgeColor,
  children,
}: PropsWithChildren<EventSectionProps>) {
  const attachedRef = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.animation = "fadeIn 1s forwards ease-in-out";
          return;
        }

        node.style.animation = "";
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      node.style.animation = "";
    };
  };

  return (
    <S.Container>
      <S.Wrap ref={attachedRef}>
        <S.Badge bgColor={badgeColor}>{badgeText}</S.Badge>
        <S.Box>{children}</S.Box>
      </S.Wrap>
    </S.Container>
  );
}

export default EventSection;
