import styled from "@emotion/styled";

export const Container = styled.main<{ excludedHeight: number }>`
  height: 100dvh;
  overflow: hidden;
  position: relative;
`;

export const Wrap = styled.div<{ currentIndex: number }>`
  transform: translateY(-${({ currentIndex }) => currentIndex * 100}dvh);
  transition: transform 0.8s cubic-bezier(0.45, 0, 0.55, 1);
`;
