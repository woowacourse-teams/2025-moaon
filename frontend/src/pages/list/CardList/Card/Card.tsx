import heartIcon from "@assets/icons/heart.svg";
import heartOutlineIcon from "@assets/icons/heart-outline.svg";
import view from "@assets/icons/view.svg";
import { ORGANIZATION_MAP } from "@domains/filter/organization";
import type { ProjectCard } from "@/apis/projects/projects.type";
import ActivityBox from "./ActivityBox/ActivityBox";
import * as S from "./Card.styled";
import PlatformList from "./PlatformList/PlatformList";
import TechStackList from "./TechStackList/TechStackList";

interface CardProps {
  project: ProjectCard;
}

function Card({ project }: CardProps) {
  const {
    id,
    title,
    summary,
    organization,
    techStacks,
    platforms,
    thumbnailUrl,
    isLoved,
    loves,
    views,
  } = project;

  return (
    <S.Card>
      <S.CardLink to={`/detail/${id}`}>
        <S.CardImageBox>
          <S.CardImage src={thumbnailUrl} />
          <PlatformList platforms={platforms} />
        </S.CardImageBox>
        <S.CardInfo>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardSummary>{summary}</S.CardSummary>
          <TechStackList techStacks={techStacks} />
          <S.CardFooter>
            <S.GroupText>{ORGANIZATION_MAP[organization].label}</S.GroupText>
            <S.Wrap>
              <ActivityBox
                icon={
                  <S.ActivityIcon
                    src={isLoved ? heartIcon : heartOutlineIcon}
                    alt="좋아요 아이콘"
                  />
                }
                count={loves}
              />
              <ActivityBox
                icon={<S.ActivityIcon src={view} alt="조회수 아이콘" />}
                count={views}
              />
            </S.Wrap>
          </S.CardFooter>
        </S.CardInfo>
      </S.CardLink>
    </S.Card>
  );
}

export default Card;
