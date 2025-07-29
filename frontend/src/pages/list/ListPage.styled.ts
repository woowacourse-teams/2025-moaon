import styled from "@emotion/styled";

export const Main = styled.main`
  padding-bottom: 3rem;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #d2d2d2;
  border-radius: 16px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #474747ff;

  &:hover {
    background-color: #f5f5f5;
    transition: background-color 0.5s ease;
  }
`;
export const ResetIcon = styled.img`
  width: 1.25rem;
`;

export const SelectedBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0.25rem 0;
  min-height: 68px;
`;

export const SelectedList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const SelectedItem = styled.li`
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  background-color: #f0f0f0;
  border-radius: 16px;
  font-size: 0.875rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;
