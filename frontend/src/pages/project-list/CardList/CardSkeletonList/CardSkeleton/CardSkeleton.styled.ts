import styled from "@emotion/styled";
import { shimmerGradient } from "@/styles/global.styled";

export const SkeletonCard = styled.li`
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  margin-top: 1.2rem;
  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
  @media screen and (max-width: 480px) {
    margin-top: 0.875rem;
  }
`;

export const SkeletonImageBox = styled.div`
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 10.9375rem;
  ${shimmerGradient}
  border-bottom: 1px solid #e9e9e9;
  @media screen and (max-width: 1280px) {
    height: 10.5rem;
  }
  @media screen and (max-width: 1024px) {
    height: 10rem;
  }
  @media screen and (max-width: 768px) {
    height: 9.5rem;
  }
  @media screen and (max-width: 480px) {
    height: 9rem;
  }
`;

export const SkeletonInfo = styled.div`
  padding: 1rem 0.75rem;
  height: 12.5rem;
  @media screen and (max-width: 1024px) {
    padding: 0.875rem 0.75rem;
    height: 11.5rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0.75rem 0.75rem;
    height: 10.5rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.625rem 0.625rem;
    height: auto;
  }
`;

export const SkeletonTitle = styled.div`
  height: 1.125rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 80%;
  @media screen and (max-width: 768px) {
    height: 1rem;
  }
  @media screen and (max-width: 480px) {
    height: 0.9375rem;
  }
`;

export const SkeletonSummary = styled.div`
  height: 2.4rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin-bottom: 1.2rem;
  @media screen and (max-width: 768px) {
    height: 2.2rem;
  }
  @media screen and (max-width: 480px) {
    height: 2rem;
  }
`;

export const SkeletonTechStacks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  @media screen and (max-width: 768px) {
    gap: 0.375rem;
  }
  @media screen and (max-width: 480px) {
    gap: 0.3125rem;
  }
`;

export const SkeletonTechStack = styled.div`
  height: 1rem;
  width: 3.5rem;
  ${shimmerGradient}
  border-radius: 0.2rem;
  @media screen and (max-width: 768px) {
    height: 0.9375rem;
    width: 3.25rem;
  }
  @media screen and (max-width: 480px) {
    height: 0.875rem;
    width: 3rem;
  }
`;
