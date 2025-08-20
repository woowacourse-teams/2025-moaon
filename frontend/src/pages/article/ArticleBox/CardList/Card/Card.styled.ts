import styled from "@emotion/styled";
import { Link } from "react-router";
import { textOverflowEllipsis } from "@/styles/global.styled";

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
  gap: 2rem;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
`;

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
    & > ${BackDropBox} {
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
`;

export const CardClickCount = styled.span`
  font-size: 0.8125rem;
  color: #595858;
`;

const LinkStyle = `
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;
  color: #fff;
  background-image: linear-gradient(to right, white 0 100%);
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 0% 1px;
  transition: color .25s ease, background-size .25s ease;

  &:hover {
    color: darkgray;
    background-size: 100% 1px;
  }
`;

export const ArticleLink = styled.a`
  cursor: pointer;
  ${LinkStyle}
`;

export const ProjectLink = styled(Link)`
  ${LinkStyle}
`;
