import styled from "@emotion/styled";

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArticleIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;
`;

export const ArticleIntroText = styled.span`
  font-weight: 500;
  color: #007bff;
`;

export const EmptyContainer = styled.div`
  width: 58.125rem; /* CardList와 동일한 폭 */
`;
