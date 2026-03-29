import eyeIcon from "@assets/icons/eye.svg";
import cardDefaultImage from "@assets/images/default-image.png";
import notFoundImage from "@assets/images/image-not-found.png";
import { getOptimizedImageUrl } from "@shared/utils/getOptimizedImageUrl";
import { memo, useState } from "react";
// import grayHeartIcon from "@assets/icons/gray-heart.svg";
// import redHeartIcon from "@assets/icons/pink-heart.svg";
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
    // isLoved,
    // loves,
    views,
  } = project;

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);
    setIsImageLoaded(true);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const imageSrc = hasError
    ? notFoundImage
    : thumbnailUrl || cardDefaultImage;

  return (
    <S.Card>
      <S.CardLink to={`/project/${id}`}>
        <S.CardImageBox aria-hidden="true" $isLoaded={isImageLoaded}>
          <picture>
            {thumbnailUrl && !hasError && (
              <source
                srcSet={getOptimizedImageUrl(thumbnailUrl, 300)}
                type="image/webp"
              />
            )}

            <S.CardImage
              src={imageSrc}
              onError={handleImageError}
              onLoad={handleImageLoad}
              alt={`${title} 프로젝트 썸네일`}
              $isLoaded={isImageLoaded}
            />
          </picture>
        </S.CardImageBox>
        <S.CardInfo>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardSummary>{summary}</S.CardSummary>
          <TechStackList techStacks={techStacks} aria-hidden="true" />
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
                icon={<S.EyeIcon src={eyeIcon} alt="조회수" />}
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
