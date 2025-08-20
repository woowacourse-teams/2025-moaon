import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Spinner = styled.div`
  width: 4rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border: 3px solid;
  border-color: #f3f5f8ff #f3f5f8ff #f3f5f8ff #007bff;
  animation: ${spin} 0.8s linear infinite;
  background: transparent;
`;
