import styled from "@emotion/styled";

export const Main = styled.main`
  padding-bottom: 3rem;
  margin-top: 5rem;
`;

export const MainBox = styled.div`
  width: 34.375rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  margin-bottom: 4.6875rem;
`;

export const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const MainDescription = styled.p`
  color: #73798d;
  font-size: 1.0938rem;
  font-weight: 500;
`;

export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 2rem;
`;

export const Wrap = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ResetButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #d2d2d2;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #474747ff;

  &:hover {
    background-color: #f5f5f5;
    transition: background-color 0.5s ease;

    & > img {
      transform: rotate(180deg);
      transition: transform 0.5s ease;
    }
  }
`;
export const ResetIcon = styled.img`
  width: 1rem;
`;
