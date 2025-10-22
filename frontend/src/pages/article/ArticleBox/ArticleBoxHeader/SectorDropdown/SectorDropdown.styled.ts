import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
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
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #afafaf;
  border-radius: 6px;
  background-color: white;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.09);
  z-index: 10;
  margin-top: 0.5rem;
`;

export const DropdownItem = styled.li`
  padding: 1.21rem 1rem;
  border-bottom: 1px solid #ddddddff;
  cursor: pointer;

  &:hover {
    background-color: #f6faffff;
    color: #007bff;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;
