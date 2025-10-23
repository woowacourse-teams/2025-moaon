import styled from "@emotion/styled";

export const RegisterProjectButton = styled.button`
  font-size: 0.875rem;
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
`;

export const Icon = styled.img`
  width: 14px;
  aspect-ratio: 1/1;
`;
