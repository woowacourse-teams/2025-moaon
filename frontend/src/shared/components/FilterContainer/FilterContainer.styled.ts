import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    gap: 0.5rem;
    flex-wrap: nowrap;
  }
  @media screen and (max-width: 480px) {
    gap: 0.375rem;
    flex-wrap: nowrap;
  }
`;
