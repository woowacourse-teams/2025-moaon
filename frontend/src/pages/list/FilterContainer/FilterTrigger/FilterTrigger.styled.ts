import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 0.5rem 0.5rem 1.125rem;
  border-radius: 6px;
  border: 1px solid #d2d2d2;
  display: flex;
  align-items: center;
  color: #454545;
  font-size: 0.9688rem;
  font-weight: 500;
`;

export const FilterTitle = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
`;

export const FilterSelectedCount = styled.span`
  color: #007bff;
  font-size: 0.9688rem;
  font-weight: 800;
  width: 1.0625rem;
`;
