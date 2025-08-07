import styled from "@emotion/styled";

export const TabContainer = styled.div<{ width?: number }>`
  display: inline-block;
  padding: 0.3125rem;
  border: 1.5px solid #e6e8eb;
  border-radius: 5px;
  margin-bottom: 2.25rem;
  width: ${({ width }) => width}%;
`;

export const TabItemList = styled.ul`
  display: flex;
  gap: 0.25rem;
`;

export const TabItem = styled.li<{ isSelected: boolean; width?: number }>`
  padding: 0.4375rem 1.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000000")};
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#fff")};
  cursor: pointer;
  width: ${({ width }) => width}%;
  text-align: center;
`;
