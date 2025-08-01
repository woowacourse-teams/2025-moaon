import styled from "@emotion/styled";

const Body = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
`;

const Caption = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #757575;
`;

export const TitleSectionContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const TitleSectionRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  align-items: flex-end;
`;

export const Subject = styled.p`
  font-size: 1rem;
  margin-bottom: 1.25rem;
`;

export const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const RegistrationDate = styled(Caption)``;

export const ProductDescription = styled(Body)``;

export const LoveCount = styled(Body)``;

export const LoveButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const ButtonBar = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const NavLink = styled.a`
  font-size: 1.125rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #007bff;
  color: #007bff;

  &:hover {
    background-color: #007bff;
    color: white;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;
