import styled from "@emotion/styled";
import { BP_768 } from "@/styles/global.styled";

export const RegisterPageContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
`;

export const TitleSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 5rem;
  margin-bottom: 4rem;

  ${BP_768} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

export const FormBox = styled.div`
  margin: 0 auto;
  width: 60%;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: rgba(58, 103, 215, 0.2) 0px 7px 29px 0px;
  border: 1px solid #cacacaff;

  ${BP_768} {
    width: 100%;
  }
`;
