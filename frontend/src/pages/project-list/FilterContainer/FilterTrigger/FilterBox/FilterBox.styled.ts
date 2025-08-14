import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  top: 3.125rem;
  left: 0;
  z-index: 998;
  min-width: 34.375rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.09);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  border: 1px solid #afafaf;
`;

export const Wrap = styled.div``;

export const FilterResetButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  width: 3.125rem;
  color: #3f3f3f;
  position: relative;

  &:disabled {
    color: #bdbdbd;
  }
`;
