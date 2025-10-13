import styled from "@emotion/styled";

export const Container = styled.section`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: 0;
  padding-top: 4.0625rem;

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
`;

export const Box = styled.div`
  width: 100%;
`;
