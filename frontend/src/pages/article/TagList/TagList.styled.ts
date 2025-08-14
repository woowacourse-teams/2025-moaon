import styled from "@emotion/styled";

export const TagListContainer = styled.div`
  width: 17.5rem;
  display: flex;
  flex-direction: column;
  padding: 0 0 2rem 2rem;
  gap: 1.125rem;
  border-left: 1px solid #d1d6dd;
`;

export const TagListTitle = styled.h2`
  color: #73798d;
  font-size: 1.125rem;
  font-weight: 500;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.8rem 0.4rem;
`;

export const TagListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResetButton = styled.button``;
