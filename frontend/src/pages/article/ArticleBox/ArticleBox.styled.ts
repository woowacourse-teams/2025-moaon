import styled from "@emotion/styled";

export const ArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 2rem;
`;

export const ArticleHeader = styled.div<{ hasTotalCount: boolean }>`
  display: flex;
  justify-content: ${({ hasTotalCount }) => (hasTotalCount ? `space-between` : "flex-end")};
  align-items: center;
  padding: 0 1rem;
`;

export const ArticleIntro = styled.p`
  color: #73798d;
  font-size: 1.125rem;
`;

export const ArticleIntroText = styled.span`
  color: #007bff;
`;
