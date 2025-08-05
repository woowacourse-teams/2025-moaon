import styled from "@emotion/styled";
import { Link } from "react-router";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const Card = styled.li`
  width: 100%;
  overflow: hidden;

  &:hover {
    transition: 0.25s linear;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    & > a > div > img {
      transform: scale(1.2);
      transition: 0.25s linear;
    }

    & h2 {
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
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const CardInfo = styled.div`
  padding: 0.875rem 1.25rem 0.75rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
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
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
  gap: 0.875rem;
`;

export const HeartIcon = styled.img`
  width: 0.875rem;
`;

export const EyeIcon = styled.img`
  width: 1.125rem;
`;
