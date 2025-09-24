import styled from "@emotion/styled";

export const ArticleSectionContainer = styled.section`
  border-top: 1px solid #d4d4d4;
  padding-top: 2rem;
`;

export const EmptyContainer = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0;
  height: 13.6875rem;
`;

export const SearchHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 1rem 0 2rem;
`;

export const ArticleIntroText = styled.span`
  font-weight: 500;
  color: #007bff;
`;

export const ArticleDescriptionText = styled.p`
  font-size: 1.125rem;
`;

export const SearchBarBox = styled.div`
  width: 25.25rem;
`;
