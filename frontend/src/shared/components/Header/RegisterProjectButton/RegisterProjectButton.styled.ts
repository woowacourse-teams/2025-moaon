import styled from "@emotion/styled";

export const RegisterProjectButton = styled.button`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 0.0625rem;
    bottom: -0.3125rem;
    left: 0;
    background-color: #000;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

export const Icon = styled.img`
  width: 1.125rem;
  aspect-ratio: 1/1;
`;
