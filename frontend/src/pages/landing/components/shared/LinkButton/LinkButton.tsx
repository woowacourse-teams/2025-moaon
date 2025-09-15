import styled from "@emotion/styled";
import { Link } from "react-router";

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
}

function LinkButtonProps({ children, href }: LinkButtonProps) {
  return <LinkButtonStyle to={href}>{children}</LinkButtonStyle>;
}

export default LinkButtonProps;

const LinkButtonStyle = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 9999px;
  background: #6c63ff;
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(108, 99, 255, 0.35);
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(108, 99, 255, 0.45);
  }
`;
