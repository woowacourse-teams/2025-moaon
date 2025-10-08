import styled from "@emotion/styled";
import { BP_1280 } from "@/styles/global.styled";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 1rem;

  ${BP_1280} {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const Image = styled.img`
  height: 75px;
  object-fit: contain;
  aspect-ratio: 1/1;
`;

export const ContentSection = styled.section``;

export const FilterContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ProjectCountText = styled.p`
  color: #6e6e6e;
  font-size: 1rem;
  font-family: "GMarketSans", sans-serif;
  padding-right: 0.5rem;
  font-weight: 600;
`;
