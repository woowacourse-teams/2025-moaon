import styled from "@emotion/styled";
import { Link } from "react-router";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const CardContainer = styled.li`
  position: relative;
  border: 1px solid #d1d6dd;
  padding: 1rem 1.375rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  overflow: hidden;
  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    & > .back-drop-box {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.25;
  height: 2.8125rem;
  ${textOverflowEllipsis(2)}
`;

export const CardSummary = styled.span`
  font-size: 0.8125rem;
  line-height: 1.5;
  color: #555555;
  height: 3.75rem;
  ${textOverflowEllipsis(3)};
`;

export const BackDropBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(35, 35, 35, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
`;

export const ArticleLink = styled.a`
  padding: 0.5rem 1rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
`;

export const ProjectLink = styled(Link)`
  padding: 0.5rem 1rem;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
`;
