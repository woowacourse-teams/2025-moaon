import styled from "@emotion/styled";

export const ActivityBox = styled.div`
  padding: 0.25rem 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #afafaf;
  font-size: 0.75rem;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    font-size: 0.71875rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.6875rem;
  }
`;

export const ActivityIcon = styled.img`
  width: 0.875rem;
  @media screen and (max-width: 768px) {
    width: 0.8125rem;
  }
  @media screen and (max-width: 480px) {
    width: 0.75rem;
  }
`;
