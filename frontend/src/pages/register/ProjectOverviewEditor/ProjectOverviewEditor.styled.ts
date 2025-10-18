import styled from "@emotion/styled";

export const Container = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TabHeader = styled.div`
  padding: 0.35rem;
  display: flex;
  background-color: #f3f3f3ff;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.75rem 0;
  border-radius: 6px;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? "#111827" : "#6b7280")};
  background-color: ${({ isActive }) => (isActive ? "#fff" : "transparent")};
  border: none;
  cursor: pointer;
`;

export const ContentBox = styled.div`
  height: 15.625rem;
  background-color: #fff;
`;

export const TextArea = styled.textarea`
  padding: 0.875rem;
  width: 100%;
  height: 100%;
  min-height: 15.625rem;
  resize: none;
  border: none;
  outline: none;
  line-height: 1.6;
  color: #374151;
  font-family: inherit;
  font-size: 1rem;

  &::placeholder {
    color: #9ca3af;
  }
`;

export const PreviewBox = styled.div`
  padding: 0.875rem;
  color: #374151;
  line-height: 1.6;
  word-break: break-all;
  overflow-wrap: break-word;
  max-height: 15.625rem;
  overflow-y: auto;
`;
