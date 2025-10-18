import styled from "@emotion/styled";
import { Link } from "react-router";
import {
  flexCenter,
  shimmerGradient,
  textOverflowEllipsis,
} from "@/styles/global.styled";

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;

  /* 처음에는 투명하게 시작 */
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  /* 로드 완료 시 나타나기 */
  &.loaded {
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    object-fit: cover;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  margin: 0.25rem 0;
  font-weight: 700;
  ${textOverflowEllipsis(1)}
  @media screen and (max-width: 1024px) {
    font-size: 1.0625rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

export const Card = styled.li`
  width: 100%;
  overflow: hidden;
  border-radius: 10px;

  & * {
    user-drag: none;
    -webkit-user-drag: none;
  }

  &:hover {
    transition: 0.25s linear;
    box-shadow: rgba(58, 103, 215, 0.2) 0px 7px 29px 0px;

    & ${CardImage} {
      transform: scale(1.1);
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
  aspect-ratio: 14/8;
  overflow: hidden;
  position: relative;
  border: 1px solid #b8b8b8;
  border-radius: 10px 10px 0 0;

  /* 기본 스켈레톤 배경 */
  ${shimmerGradient}

  /* 이미지가 완전히 로드되면 배경 애니메이션 중지 */
  &.image-loaded {
    background: none;
    animation: none;
  }
  @media screen and (max-width: 1280px) {
    aspect-ratio: 16/9;
  }
  @media screen and (max-width: 768px) {
    aspect-ratio: 4/3;
  }
  @media screen and (max-width: 480px) {
    aspect-ratio: 1.6/1;
  }
`;

export const CardInfo = styled.div`
  padding: 0.875rem 1.25rem 0.75rem;
  @media screen and (max-width: 1024px) {
    padding: 0.875rem 1rem 0.75rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0.75rem 0.875rem 0.625rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.625rem 0.75rem 0.5rem;
  }
`;

export const CardSummary = styled.p`
  margin: 0.75rem 0 0.3125rem;
  height: 3rem;
  line-height: 1.5;
  color: #555;
  font-size: 0.9375rem;
  ${textOverflowEllipsis(2)}
  @media screen and (max-width: 1024px) {
    font-size: 0.9rem;
    height: 2.8rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
    height: 2.6rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.84375rem;
    height: 2.4rem;
  }
`;

export const CardFooter = styled.div`
  ${flexCenter}
  justify-content: right;
  margin-top: 0.75rem;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    margin-top: 0.5rem;
    gap: 0.75rem;
  }
  @media screen and (max-width: 480px) {
    margin-top: 0.375rem;
    gap: 0.5rem;
  }
`;

export const GroupText = styled.span`
  font-size: 0.75rem;
  color: #999c9f;
  @media screen and (max-width: 768px) {
    font-size: 0.71875rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.6875rem;
  }
`;

export const Wrap = styled.div`
  ${flexCenter}
  gap: 0.75rem;
  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
  @media screen and (max-width: 480px) {
    gap: 0.375rem;
  }
`;

export const ActivityBox = styled.div`
  padding: 0.25rem;
  ${flexCenter}
  gap: 0.25rem;
  font-size: 0.875rem;
  @media screen and (max-width: 768px) {
    font-size: 0.8125rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const HeartIcon = styled.img`
  width: 0.875rem;
  @media screen and (max-width: 768px) {
    width: 0.8125rem;
  }
  @media screen and (max-width: 480px) {
    width: 0.75rem;
  }
`;

export const EyeIcon = styled.img`
  width: 1.125rem;
  @media screen and (max-width: 768px) {
    width: 1rem;
  }
  @media screen and (max-width: 480px) {
    width: 0.9375rem;
  }
`;
