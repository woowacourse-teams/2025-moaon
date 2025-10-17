import styled from "@emotion/styled";

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const DropdownButton = styled.button`
  padding: 0.625rem;
  background: #fff;
  border: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

export const DropdownList = styled.ul`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  z-index: 10;
  overflow: hidden;
  position: absolute;
  top: 110%;
  left: 0;
`;

export const DropdownItem = styled.li`
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #f6faffff;
    color: #007bff;
  }
`;
