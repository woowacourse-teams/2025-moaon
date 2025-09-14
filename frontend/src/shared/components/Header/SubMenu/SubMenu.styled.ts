import styled from "@emotion/styled";

export const SubMenuList = styled.ul`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  position: relative;
`;

export const SubMenuItem = styled.li`
  width: 9.375rem;
  padding: 1.25rem 0;
  text-align: center;
  cursor: pointer;
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
