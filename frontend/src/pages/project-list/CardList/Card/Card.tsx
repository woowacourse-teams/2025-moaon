import eyeIcon from "@assets/icons/eye.svg";
import grayHeartIcon from "@assets/icons/gray-heart.svg";
import redHeartIcon from "@assets/icons/pink-heart.svg";
import cardDefaultImage from "@assets/images/default-image.png";
import notFoundImage from "@assets/images/image-not-found.png";
import { memo, type SyntheticEvent } from "react";
import type { ProjectCard } from "@/apis/projects/projects.type";
import * as S from "./Card.styled";
import StatBox from "./StatBox/StatBox";
import TechStackList from "./TechStackList/TechStackList";

interface CardProps {
  project: ProjectCard;
  isEyeIcon?: boolean; // TODO: 이벤트 기간이 끝난 후 제거 예정
}

function Card({ project, isEyeIcon = true }: CardProps) {
  const {
    id,
    title,
    summary,
    techStacks,
    thumbnailUrl,
    isLoved,
    loves,
    views,
  } = project;

  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = notFoundImage;
    // 에러 발생 시에도 로드된 것으로 처리
    target.classList.add("loaded");
    target.parentElement?.classList.add("image-loaded");
  };

  const imageLoadSuccess = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.classList.add("loaded");
    target.parentElement?.classList.add("image-loaded");
  };

  return (
    <S.Card>
      <S.CardLink to={`/project/${id}`}>
        <S.CardImageBox>
          <S.CardImage
            src={thumbnailUrl ? thumbnailUrl : cardDefaultImage}
            onError={imageLoadError}
            onLoad={imageLoadSuccess}
            alt={`${title} 프로젝트 썸네일`}
          />
        </S.CardImageBox>
        <S.CardInfo>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardSummary>{summary}</S.CardSummary>
          <TechStackList techStacks={techStacks} />
          <S.CardFooter>
            {/* <StatBox
              icon={
                <S.HeartIcon
                  src={isLoved ? redHeartIcon : grayHeartIcon}
                  alt="좋아요 아이콘"
                />
              }
              count={loves}
            /> */}
            {isEyeIcon && (
              <StatBox
                icon={<S.EyeIcon src={eyeIcon} alt="조회수 아이콘" />}
                count={views}
              />
            )}
          </S.CardFooter>
        </S.CardInfo>
      </S.CardLink>
    </S.Card>
  );
}

export default memo(Card);
