import styled from "@emotion/styled";

export const LoginModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
`;

export const LoginModalTitle = styled.b`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 0 2rem;
  text-align: center;
  font-size: 1.25rem;
  line-height: 1.6;
  font-weight: 700;
`;

export const LoginModalInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

export const LoginModalInfoLine = styled.hr`
  width: 5rem;
  height: 1px;
  background-color: #ccc;
`;

export const LoginModalInfoText = styled.span`
  font-size: 0.875rem;
  color: #000;
`;
