import styled from "@emotion/styled";

export const Container = styled.section<{ isVisible?: boolean }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Badge = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  display: inline-block;
  font-size: 1.125rem;
  margin-top: 4.75rem;
`;

export const Box = styled.div`
  height: 700px;
  width: 100%;
`;
