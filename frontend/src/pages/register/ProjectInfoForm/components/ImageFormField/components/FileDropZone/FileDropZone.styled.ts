import styled from "@emotion/styled";

export const DropZone = styled.div<{ isOver: boolean; disabled: boolean }>`
  width: 100%;
  height: 9.375rem;
  border: 2px dashed ${({ isOver }) => (isOver ? "#007bff" : "#cccccc")};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  word-break: keep-all;
  align-items: center;
  text-align: center;
  line-height: 1.5;
  justify-content: center;
  background-color: ${(props) => (props.isOver ? "#e6f0ff" : "transparent")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: border-color 0.3s, background-color 0.3s;
  font-size: 0.875rem;
  color: ${({ disabled }) => (disabled ? "#999" : "#333")};
`;
