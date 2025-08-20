import styled from "@emotion/styled";

export const TabContainer = styled.div<{ width?: number }>`
  display: inline-block;
  padding: 0.3125rem;
  border: 1.5px solid #e6e8eb;
  border-radius: 5px;
  margin-bottom: 2rem;
  width: ${({ width }) => width}%;
`;

export const TabItemList = styled.ul`
  display: flex;
  gap: 0.25rem;
  position: relative;
`;

export const TabItem = styled.li<{
  isSelected: boolean;
  width?: number;
  duration: number;
}>`
  padding: 0.5rem 1.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#000000")};
  cursor: pointer;
  width: ${({ width }) => width}%;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color ${({ duration }) => duration}s linear;
`;

export const SlidingBG = styled.div<{
  translateX: number;
  width: number;
  duration: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 4px;
  background-color: #007bff;
  z-index: 0;
  transform: translateX(${({ translateX }) => translateX}px);
  width: ${({ width }) => width}px;
  transition: transform ${({ duration }) => duration}s ease-in-out,
    width ${({ duration }) => duration}s ease-out;
`;
