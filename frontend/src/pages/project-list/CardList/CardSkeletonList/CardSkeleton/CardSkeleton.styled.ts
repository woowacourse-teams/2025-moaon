import styled from "@emotion/styled";
import { flexCenter, shimmerGradient } from "@/styles/global.styled";

export const SkeletonCard = styled.li`
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
  margin-top: 1.2rem;
`;

export const SkeletonImageBox = styled.div`
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 10.9375rem;
  ${shimmerGradient}
  border-bottom: 1px solid #e9e9e9;
`;

export const SkeletonInfo = styled.div`
  padding: 1rem 0.75rem;
  height: 12.5rem;
`;

export const SkeletonTitle = styled.div`
  height: 1.125rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  width: 80%;
`;

export const SkeletonSummary = styled.div`
  height: 2.4rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin-bottom: 1.2rem;
`;

export const SkeletonTechStacks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const SkeletonTechStack = styled.div`
  height: 1rem;
  width: 3.5rem;
  ${shimmerGradient}
  border-radius: 0.2rem;
`;
