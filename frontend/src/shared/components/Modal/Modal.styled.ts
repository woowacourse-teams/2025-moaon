import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Content = styled.div`
  position: relative;
  background-color: #fff;
`;

export const Title = styled.h2`
  margin: 0 0 16px 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

export const Description = styled.p`
  margin: 0 0 16px 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;
