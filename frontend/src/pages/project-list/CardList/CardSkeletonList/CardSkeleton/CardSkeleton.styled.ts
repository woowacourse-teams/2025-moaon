import styled from "@emotion/styled";
import { flexCenter, shimmerGradient } from "@/styles/global.styled";

export const SkeletonCard = styled.li`
  width: 100%;
  overflow: hidden;
  background-color: #ffffff;
`;

export const SkeletonImageBox = styled.div`
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
  height: 1.875rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin: 0.25rem 0 0.5rem 0;
  width: 80%;
`;

export const SkeletonSummary = styled.div`
  height: 3rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
`;

export const SkeletonTechStacks = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const SkeletonTechStack = styled.div`
  height: 1.5rem;
  width: 3.5rem;
  ${shimmerGradient}
  border-radius: 0.75rem;
`;

export const SkeletonFooter = styled.div`
  ${flexCenter}
  gap: 1rem;
`;

export const SkeletonActivityItem = styled.div`
  height: 1.25rem;
  width: 3rem;
  ${shimmerGradient}
  border-radius: 0.25rem;
`;
