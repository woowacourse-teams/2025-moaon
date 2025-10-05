import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import type { ProjectCard } from "@/apis/projects/projects.type";
import Card from "@/pages/project-list/CardList/Card/Card";
import { useProjectCarousel } from "./hooks/useProjectCarousel";
import * as S from "./ProjectCarousel.styled";

interface ProjectCarouselProps {
  projects: ProjectCard[];
}

function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const { scrollNext, scrollPrev, translateX, buttonVisible, ref } =
    useProjectCarousel(projects.length);

  return (
    <S.Container>
      <S.CarouselContainer>
        <S.Carousel ref={ref} translateX={translateX}>
          {projects.map((project) => (
            <S.CardItem key={project.id}>
              <Card project={project} />
            </S.CardItem>
          ))}
        </S.Carousel>
      </S.CarouselContainer>
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
    </S.Container>
  );
}

export default ProjectCarousel;
