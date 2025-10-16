import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 0.75rem 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #d2d2d2;
  display: flex;
  align-items: center;
  color: #454545;
  font-size: 0.9688rem;
  font-weight: 500;
  @media screen and (max-width: 768px) {
    padding: 0.45rem 0.65rem;
    font-size: 0.9rem;
  }
  @media screen and (max-width: 480px) {
    padding: 0.4rem 0.6rem;
    font-size: 0.875rem;
  }
`;

export const FilterTitle = styled.p`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  @media screen and (max-width: 480px) {
    gap: 0.375rem;
  }
`;

export const FilterSelectedCount = styled.span`
  color: #007bff;
  font-size: 0.9rem;
  font-weight: 800;
  width: 0.95rem;
  @media screen and (max-width: 768px) {
    font-size: 0.875rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.84375rem;
    width: 0.875rem;
  }
`;
