import styled from "@emotion/styled";

export const TechStackList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.25rem 0 0;
  gap: 0.375rem;
  height: 1.25rem;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    gap: 0.3125rem;
  }
  @media screen and (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const TechStack = styled.li`
  color: #7f7f7f;
  font-size: 0.8125rem;
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    font-size: 0.78125rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.71875rem;
  }
`;

export const Separator = styled.div`
  background-color: #7f7f7f;
  width: 0.125rem;
  height: 0.125rem;
  border-radius: 50%;
  display: flex;
  @media screen and (max-width: 768px) {
    width: 0.09375rem;
    height: 0.09375rem;
  }
`;
