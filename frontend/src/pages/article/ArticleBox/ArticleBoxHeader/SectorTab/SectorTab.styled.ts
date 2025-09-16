import styled from "@emotion/styled";

export const SectorTabList = styled.ul`
  width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
`;

export const SectorTabItem = styled.li<{ selected: boolean }>`
  width: 12.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.25rem 0;
  cursor: pointer;
  ${({ selected }) => selected && `color: #007bff;`}
`;

export const Underline = styled.div<{
  translateX: number;
  width: number;
  duration: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateX(${({ translateX }) => translateX}px);
  width: ${({ width }) => width}px;
  height: 0.125rem;
  background-color: #007bff;
  border-radius: 62.5rem 62.5rem 0rem 0rem;
  transition: transform ${({ duration }) => duration}s
      cubic-bezier(0.4, 0, 0.2, 1),
    width ${({ duration }) => duration}s cubic-bezier(0.4, 0, 0.2, 1);
`;
