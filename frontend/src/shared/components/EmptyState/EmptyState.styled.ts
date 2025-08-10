import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
  min-height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export const Image = styled.img`
  width: 12.5rem; /* 200px */
  height: auto;
  opacity: 0.7;
`;

export const Title = styled.p`
  color: #73798d;
  font-size: 1.125rem;
`;

export const Description = styled.p`
  color: #9aa1b2;
  font-size: 0.9375rem;
`;
