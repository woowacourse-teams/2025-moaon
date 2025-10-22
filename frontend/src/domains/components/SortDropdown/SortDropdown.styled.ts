import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  position: relative;
  min-width: 7.5rem;
`;

export const DropdownHeader = styled.button`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  gap: 0.5rem;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  width: 100%;
  border: 1px solid #afafaf;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.09);
  z-index: 10;
  overflow: hidden;
`;

export const DropdownItem = styled.li`
  padding: 1.21rem 1rem;
  border-bottom: 1px solid #dddddd;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #f6faff;
    color: #007bff;
  }

  &:last-of-type {
    border-bottom: none;
  }

  &[aria-selected="true"] {
    background-color: #e3f2fd;
    color: #007bff;
    font-weight: 600;
  }
`;
