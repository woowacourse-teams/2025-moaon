import styled from "@emotion/styled";

export const NotFountResult = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  margin-top: 0.25rem;
  min-height: 7.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #d1d6dd;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #828489ff;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  border: 1px solid #d1d6dd;
  border-radius: 8px;
  max-height: 11.875rem;
  overflow-y: auto;
  left: 0;
  top: 100%;
  margin-top: 0.25rem;

  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 8px;
    background: #f5f6fa;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d6dd;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #bfc3cc;
  }
`;

export const Item = styled.li`
  border-bottom: 1px solid #d1d6dd;

  &:first-of-type {
    border-radius: 8px 8px 0 0;
  }

  &:last-of-type {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Icon = styled.img`
  width: 1rem;
`;
