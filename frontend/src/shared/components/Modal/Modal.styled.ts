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

export const Content = styled.div<{
  variant: "default" | "image";
}>`
  position: relative;
  background-color: #fff;

  ${({ variant }) =>
    variant === "default"
      ? `
    max-width: 90dvw;
    max-height: 90dvh;
    overflow-y: auto;
    padding: 2rem;
    border-radius: 12px;
  `
      : `
    max-width: 90dvw;
    max-height: 90dvh;
  `}
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 10;
  padding: 0.5rem;
`;

export const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

export const Description = styled.p`
  margin: 0 0 1rem 0;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.5;
`;
