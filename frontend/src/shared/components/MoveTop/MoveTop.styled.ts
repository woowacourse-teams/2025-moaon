import styled from "@emotion/styled";

export const MoveTopButton = styled.button`
  display: flex;
  position: fixed;
  bottom: 2.5rem;
  right: 5rem;
  z-index: 5;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  background-color: #d4d4d4;
  gap: 0.25rem;
  padding: 0.3125rem;

  :hover {
    background-color: #bdbdbd;
    transition: background-color 0.3s ease;
  }
`;
