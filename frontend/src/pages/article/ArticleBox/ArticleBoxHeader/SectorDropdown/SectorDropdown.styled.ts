import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DropdownHeader = styled.button`
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownList = styled.ul`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  z-index: 10;
`;

export const DropdownItem = styled.li`
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f6faffff;
    color: #007bff;
  }
`;
