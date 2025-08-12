import styled from "@emotion/styled";

export const Container = styled.div`
  overflow-y: auto;
  height: 17.5rem;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 4px;
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #cfcfcfff;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b1b1b1ff;
  }
`;
