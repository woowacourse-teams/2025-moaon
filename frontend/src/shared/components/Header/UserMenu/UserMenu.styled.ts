import styled from "@emotion/styled";

export const UserMenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: underline;
`;

export const UserMenuList = styled.ul`
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  z-index: 10;
  overflow: hidden;
  position: absolute;
  top: 150%;
  right: 0;
`;

export const UserMenuItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #f6faffff;
    color: #007bff;
  }
`;
