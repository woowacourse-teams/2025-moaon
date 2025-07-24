import styled from "@emotion/styled";
import { Link } from "react-router";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const Card = styled.li`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    box-shadow: rgba(0, 123, 255, 0.3) 0px 10px 36px 0px,
      rgba(0, 123, 255, 0.3) 0px 0px 0px 1px;
    transition: 0.5s linear;

    & img {
      transform: scale(1.05);
      transition: 0.25s linear;
    }
  }
`;

export const CardLink = styled(Link)``;

export const CardImageBox = styled.div`
  width: 100%;
  height: 10.9375rem;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #e9e9e9;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const CardInfo = styled.div`
  padding: 1rem 0.75rem;
  height: 12.5rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0.25rem 0;
  line-height: 1.5;
  ${textOverflowEllipsis(1)}
`;

export const CardSummary = styled.p`
  margin-bottom: 0.5rem;
  height: 3rem;
  line-height: 1.5;
  ${textOverflowEllipsis(2)}
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;

export const GroupText = styled.span`
  font-size: 0.75rem;
  color: #999c9f;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const ActivityBox = styled.div`
  padding: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
`;

export const ActivityIcon = styled.img`
  width: 0.875rem;
`;
