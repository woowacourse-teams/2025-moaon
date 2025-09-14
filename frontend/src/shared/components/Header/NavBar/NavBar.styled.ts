import styled from "@emotion/styled";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1.5rem;
  position: relative;
`;

export const NavLinkItem = styled.li`
  position: relative;

  ::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -0.75rem;
    transform: translateY(-50%);
    width: 0.0625rem;
    height: 1rem;
    background-color: #d4d4d4;
    border-radius: 0.125rem;
  }
  :last-of-type {
    ::before {
      display: none;
    }
  }
`;

export const Link = styled.button<{ isSelected: boolean }>`
  color: ${({ isSelected }) => (isSelected ? "#007bff" : "#000")};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 400)};
  padding: 1.75rem 0;
  display: inline-block;
  font-size: 1rem;

  &:hover {
    font-weight: 600;
  }
`;

export const Underline = styled.div<{
  translateX: number;
  width: number;
  duration: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(${({ translateX }) => translateX}px);
  width: ${({ width }) => width}px;
  height: 0.125rem;
  background-color: #007bff;
  border-radius: 62.5rem 62.5rem 0rem 0rem;
  transition: transform ${({ duration }) => duration}s
      cubic-bezier(0.4, 0, 0.2, 1),
    width ${({ duration }) => duration}s cubic-bezier(0.4, 0, 0.2, 1);
`;
