import styled from "@emotion/styled";
import { Link } from "react-router";
import { textOverflowEllipsis } from "@/styles/global.styled";

export const PostBox = styled.li`
  width: 100%;
  height: 10rem;
  border: 1px solid #bbbbbb;
  background-color: #ffffffff;
  margin-bottom: 1.25rem;
`;

export const PostLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  transition: all 0.5s;

  &:hover {
    color: #ffffffff;
    background-color: #3999ffae;
  }

  &:hover > div > p {
    color: #ffffffff;
  }
`;

export const TextBox = styled.div`
  width: 53.125rem;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostTitle = styled.h3`
  ${textOverflowEllipsis(1)}
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
`;

export const PostContent = styled.p`
  ${textOverflowEllipsis(2)}
  font-size: 1rem;
  color: #989ba0;
  margin-bottom: 0.5rem;
  line-height: 1.75rem;
  transition: all 0.5s;
`;

export const PostLinkBox = styled.p`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  transition: all 0.5s;
`;

export const PostLinkText = styled.span`
  ${textOverflowEllipsis(1)}
  font-size: 1rem;
`;
