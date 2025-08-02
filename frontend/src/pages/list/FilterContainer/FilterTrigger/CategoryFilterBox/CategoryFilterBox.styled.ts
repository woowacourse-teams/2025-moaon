import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 3.125rem;
  left: 0;
  z-index: 998;
  min-width: 31.25rem;
  max-height: 29.15rem;
  overflow-y: auto;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border: 1px solid #afafaf;
`;

export const Wrap = styled.div``;

export const Title = styled.p`
  color: #3f3f3f;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1.625rem;
`;

export const FilterResetButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 3.125rem;
  color: #3f3f3f;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3f3f3f;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
