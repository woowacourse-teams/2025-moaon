import styled from "@emotion/styled";

export const RegisterProjectButton = styled.button`
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  position: relative;
  border-radius: 8px;
  padding: 10px 14px 10px 16px;
  background-color: #007bff;
  color: #fff;

  &:hover {
    background-color: #0472e8ff;
    transition: background-color 0.3s ease;
  }
  @media screen and (max-width: 1024px) {
    font-size: 13px;
    padding: 9px 13px 9px 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 8px 12px 8px 14px;
  }
  @media screen and (max-width: 480px) {
    font-size: 11.5px;
    padding: 7px 11px 7px 13px;
  }
`;

export const Icon = styled.img`
  width: 14px;
  aspect-ratio: 1/1;
  @media screen and (max-width: 768px) {
    width: 13px;
  }
  @media screen and (max-width: 480px) {
    width: 12px;
  }
`;
