import styled from "@emotion/styled";

export const Header = styled.header`
  width: 100%;
  position: sticky;
  top: 0;
  background-color: #fff;
  padding: 12px 0;
  border-bottom: 1px solid #d2d2d2;
  z-index: 999;
`;

export const HeaderBox = styled.div`
  width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
