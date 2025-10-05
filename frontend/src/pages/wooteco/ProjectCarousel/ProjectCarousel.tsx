import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import { useScrollRef } from "@shared/hooks/useScrollRef";
import { mergeRefs } from "@shared/utils/mergeRefs";
import type { ProjectCard } from "@/apis/projects/projects.type";
import Card from "@/pages/project-list/CardList/Card/Card";
import { useProjectCardCarousel } from "./hooks/useProjectCardCarousel";
import * as S from "./ProjectCarousel.styled";

interface ProjectCarouselProps {
  projects: ProjectCard[];
}

function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const {
    buttonVisible,
    carouselRef,
    scrollPrev,
    scrollNext,
    handleScroll,
    handleMouseDown,
    handleMouseUp,
  } = useProjectCardCarousel();
  const scrollCallbackRef = useScrollRef(handleScroll);

  return (
    <S.CarouselContainer>
      <S.CardsWrapper
        ref={mergeRefs(carouselRef, scrollCallbackRef)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {projects.map((project) => (
          <S.CardItem key={project.id}>
            <Card project={project} />
          </S.CardItem>
        ))}
      </S.CardsWrapper>
      {buttonVisible.prev && (
        <S.NavButton
          direction="left"
          onClick={scrollPrev}
          aria-label="이전 카드 목록 보기"
          type="button"
        >
          <ArrowIcon direction="left" />
        </S.NavButton>
      )}
      {buttonVisible.next && (
        <S.NavButton
          direction="right"
          onClick={scrollNext}
          aria-label="다음 카드 목록 보기"
          type="button"
        >
          <ArrowIcon direction="right" />
        </S.NavButton>
      )}
    </S.CarouselContainer>
  );
}

export default ProjectCarousel;
