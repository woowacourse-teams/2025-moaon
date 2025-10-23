import styled from "@emotion/styled";
import { BP_480, BP_768 } from "@/styles/global.styled";

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

export const ArticleAddButton = styled.button`
  width: 25rem;
  padding: 0.6rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0472e8ff;
  }

  ${BP_480} {
    width: 16rem;
  }
`;

export const ProjectNavigateButton = styled.button`
  width: 25rem;
  padding: 0.6rem 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: black;

  ${BP_480} {
    width: 16rem;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
