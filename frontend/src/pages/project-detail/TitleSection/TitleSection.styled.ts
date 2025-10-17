import styled from "@emotion/styled";
import { BP_1280 } from "@/styles/global.styled";

const Body = styled.p`
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Overline = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #535353;
`;

export const TitleSectionContainer = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 1rem;

  ${BP_1280} {
    position: relative;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const TitleSectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  width: calc(100% - 14.375rem);

  ${BP_1280} {
    width: 100%;
  }
`;

export const TitleSectionRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.875rem;
  align-items: flex-end;

  ${BP_1280} {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const OverlineSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Subject = styled(Overline)``;

export const RegistrationDate = styled(Overline)``;

export const View = styled(Overline)`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  & > img {
    width: 1.25rem;
  }

  ${BP_1280} {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const ProductName = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

export const ProductDescription = styled(Body)`
  color: #73798d;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const LoveCount = styled(Body)``;

export const LoveButton = styled.button<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  margin-right: 1rem;
  width: 4.5rem;
  height: 2.125rem;
  border: 1px solid #f35656;
  background-color: ${({ isLiked }) => (isLiked ? "#f35656" : "#fff")};
  color: ${({ isLiked }) => (isLiked ? "#fff" : "#f35656")};
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

export const ButtonBar = styled.div`
  display: flex;
  gap: 0.625rem;
  /* border-left: 1px solid #535353; */
  padding-left: 1.5rem;

  ${BP_1280} {
    padding-left: 0;
  }
`;

const NavLink = styled.a`
  font-size: 1rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  height: 2.125rem;
`;

export const GithubLink = styled(NavLink)`
  border: 1px solid #2f2f2f;
  background-color: #2f2f2f;
  color: #fff;

  &:hover {
    border: 1px solid #1f1f1f;
    background-color: #1f1f1f;
    transition: background-color 0.3s ease, border 0.3s ease;
  }
`;

export const ProductionLink = styled(NavLink)`
  border: 1px solid #8f8f8f;
  background-color: #fff;
  color: #555555;

  &:hover {
    border: 1px solid #5f5f5f;
    background-color: #f4f4f4;
    transition: background-color 0.3s ease, border 0.3s ease;
  }
`;
