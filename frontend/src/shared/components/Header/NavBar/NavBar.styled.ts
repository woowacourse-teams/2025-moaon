import styled from "@emotion/styled";

export const NavBar = styled.nav``;

export const NavLinkList = styled.ul`
  display: flex;
  gap: 1.5rem;
  position: relative;
  @media screen and (max-width: 768px) {
    gap: 1.125rem;
  }
  @media screen and (max-width: 480px) {
    gap: 0.875rem;
  }
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
  padding: 1.5rem 0;
  display: inline-block;
  font-size: 1rem;
  @media screen and (max-width: 1024px) {
    padding: 1.25rem 0;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem 0;
    font-size: 0.9375rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.875rem 0;
    font-size: 0.9rem;
  }

  &:hover {
    font-weight: ${({ isSelected }) => (isSelected ? 700 : 600)};
  }
`;
