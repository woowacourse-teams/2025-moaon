import styled from "@emotion/styled";
import { BP_768, textOverflowEllipsis } from "@/styles/global.styled";

export const CardContainer = styled.li`
  position: relative;
  border: 1px solid #b8b8b8;
  padding: 1rem 1.375rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  overflow: hidden;

  &:hover {
    transition: 0.25s linear;
    box-shadow: rgba(58, 103, 215, 0.2) 0px 7px 29px 0px;
  }

  ${BP_768} {
    padding: 0.75rem 1rem;
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.25;
  height: 2.8125rem;
  ${textOverflowEllipsis(2)}

  ${BP_768} {
    font-size: 1rem;
  }
`;

export const CardSummary = styled.span`
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #555555;
  height: 3.75rem;
  margin-bottom: 0.5rem;
  ${textOverflowEllipsis(3)};
`;

export const CardInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  width: 100%;

  > ul {
    flex: 1;
  }
`;

export const CardClickBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
`;

export const CardClickIcon = styled.img`
  width: 1.125rem;

  ${BP_768} {
    width: 1rem;
  }
`;

export const CardClickCount = styled.span`
  font-size: 0.8125rem;
  color: #595858;

  ${BP_768} {
    font-size: 0.75rem;
  }
`;

export const ArticleLink = styled.a``;

export const ProjectLinkButton = styled.div`
  font-size: 1rem;
  position: relative;
  padding: 0.4rem 0;
  background: none;
  border: none;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 0%;
    background-color: #646464ff;
    transition: width 0.25s ease;
  }

  &:hover::after {
    width: 90%;
  }

  ${BP_768} {
    font-size: 0.9rem;
  }
`;

export const BadgeList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  ${BP_768} {
    gap: 0.25rem;
  }
`;
