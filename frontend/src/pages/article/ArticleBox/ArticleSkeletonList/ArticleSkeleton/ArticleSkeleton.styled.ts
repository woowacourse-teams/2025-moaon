import styled from "@emotion/styled";
import { shimmerGradient } from "@/styles/global.styled";

export const SkeletonContainer = styled.li`
  position: relative;
  border: 1px solid #d1d6dd;
  padding: 1rem 1.375rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  height: 17.25rem;
  overflow: hidden;
`;

export const SkeletonBadge = styled.div`
  margin: 0.6rem 0;
  width: 6rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  ${shimmerGradient}
`;

export const SkeletonCardTitle = styled.h2`
  width: 100%;
  height: 2.8125rem;
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
  ${shimmerGradient}
`;

export const SkeletonCardSummary = styled.span`
  width: 100%;
  height: 3.75rem;
  border-radius: 0.375rem;
  ${shimmerGradient}
`;

export const SkeletonTechStacks = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

export const SkeletonTechStack = styled.div`
  height: 1.5rem;
  min-width: 3.5rem;
  margin-top: 1rem;
  border-radius: 0.3rem;
  ${shimmerGradient}
`;
