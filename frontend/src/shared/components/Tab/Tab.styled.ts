import styled from "@emotion/styled";

export const TabContainer = styled.div`
  display: inline-block;
  padding: 0.3125rem;
  border: 1.5px solid #e6e8eb;
  border-radius: 5px;
  margin-bottom: 2rem;
`;

export const TabItemList = styled.ul`
  display: flex;
  gap: 0.25rem;
`;

export const TabItem = styled.li<{ isSelected: boolean }>`
  padding: 0.4375rem 1.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000000")};
  background-color: ${({ isSelected }) => (isSelected ? "#007bff" : "#fff")};
  cursor: pointer;
`;
