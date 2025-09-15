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
  justify-content: space-between;
`;

export const CountText = styled.span``;

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
  display: flex;
  justify-content: center;
  gap: 0.0938rem;
  align-items: baseline;

  ${CountText} {
    font-size: 0.8125rem;
    color: ${({ isSelected }) => (isSelected ? "#fff" : "#505050ff")};
    transition: color ${({ duration }) => duration}s linear;
  }
`;

export const DisabledTabItem = styled.li<{ tabCount: number }>`
  padding: 0.5rem 1.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  gap: 0.0938rem;
  align-items: baseline;
  cursor: not-allowed;
  color: #c0c0c0;
  width: ${({ tabCount }) => 100 / tabCount}%;
`;

export const DisabledCountText = styled.span`
  font-size: 0.8125rem;
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
