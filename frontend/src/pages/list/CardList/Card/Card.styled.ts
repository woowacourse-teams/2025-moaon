import styled from "@emotion/styled";
import { Link } from "react-router";

export const Card = styled.li`
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 12px;
  overflow: hidden;

  &:hover{
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    transition: 0.5s linear;

    & img{
      transform: scale(1.05);
      transition: 0.25s linear;
    }
  }
`;

export const CardLink = styled(Link)``;

export const CardImageBox = styled.div`
  width: 100%;
  height: 175px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const CardInfo = styled.div`
  padding: 16px 12px;
  height: 175px;
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 0.75rem;
`;

//
export const CardSummary = styled.p`
  margin-bottom: 0.5rem;
`;

// middle
export const TechStackList = styled.ul`
  display: flex;
  border: 1px solid #000;
  padding: 10px;
  gap: 1rem;
`;
export const TechStack = styled.li``;

// footer
export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
`;
export const GroupText = styled.span`
  font-size: 14px;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 1rem;
`;
export const LikeBox = styled.div`
  border: 1px solid #000;
  padding: 0.25rem;
`;
export const LikeText = styled.span``;
export const ViewBox = styled.div``;
export const ViewText = styled.span``;
