import styled from "@emotion/styled";

export const List = styled.ul`
  display: flex;
  gap: 0.625rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    gap: 0.5rem;
  }
  @media screen and (max-width: 480px) {
    gap: 0.375rem;
  }
`;

export const Separator = styled.div`
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: #aaa;
  @media screen and (max-width: 768px) {
    width: 0.175rem;
    height: 0.175rem;
  }
  @media screen and (max-width: 480px) {
    width: 0.15rem;
    height: 0.15rem;
  }
`;
