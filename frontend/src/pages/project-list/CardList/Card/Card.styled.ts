import styled from "@emotion/styled";
import { Link } from "react-router";
import { flexCenter, shimmerGradient, textOverflowEllipsis } from "@/styles/global.styled";

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  /* 처음에는 투명하게 시작 */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  /* 로드 완료 시 나타나기 */
  &.loaded {
    opacity: 1;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  margin: 0.25rem 0;
  font-weight: 700;
  ${textOverflowEllipsis(1)}
`;

export const Card = styled.li`
  width: 100%;
  overflow: hidden;

  &:hover {
    transition: 0.25s linear;
    box-shadow: rgba(58, 103, 215, 0.2) 0px 7px 29px 0px;


    & ${CardImage} {
      transform: scale(1.2);
      transition: 0.25s linear;
    }

    & ${CardTitle} {
      text-decoration: underline;
      text-underline-offset: 0.125rem;
    }
  }
`;

export const CardLink = styled(Link)``;

export const CardImageBox = styled.div`
  width: 100%;
  height: 10.9375rem;
  overflow: hidden;
  position: relative;
  border: 1px solid #e9e9e9;

  /* 기본 스켈레톤 배경 */
  ${shimmerGradient}

  /* 이미지가 완전히 로드되면 배경 애니메이션 중지 */
  &.image-loaded {
    background: none;
    animation: none;
  }
`;

export const CardInfo = styled.div`
  padding: 0.875rem 1.25rem 0.75rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  line-height: 1.125;
  margin: 0.25rem 0;
  font-weight: 700;
  ${textOverflowEllipsis(1)}
`;

export const CardSummary = styled.p`
  margin: 0.75rem 0 0.3125rem;
  height: 3rem;
  line-height: 1.5;
  color: #555;
  font-size: 0.9375rem;
  ${textOverflowEllipsis(2)}
`;

export const CardFooter = styled.div`
  ${flexCenter}
  margin-top: 0.75rem;
  gap: 1rem;
`;

export const GroupText = styled.span`
  font-size: 0.75rem;
  color: #999c9f;
`;

export const Wrap = styled.div`
  ${flexCenter}
  gap: 0.75rem;
`;

export const ActivityBox = styled.div`
  padding: 0.25rem;
  ${flexCenter}
  gap: 0.25rem;
  font-size: 0.875rem;
`;

export const HeartIcon = styled.img`
  width: 0.875rem;
`;

export const EyeIcon = styled.img`
  width: 1.125rem;
`;
