import styled from "@emotion/styled";

export const TagListContainer = styled.div`
  width: 17.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.125rem;
  border-left: 1px solid #d1d6dd;
  padding-top: 2rem;
`;

export const TagListTitle = styled.h2`
  color: #73798d;
  font-size: 1.125rem;
  margin: 0 0.625rem 0 0;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0 0 0 1rem;
`;
