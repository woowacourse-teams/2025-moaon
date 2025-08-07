import styled from "@emotion/styled";

export const Container = styled.div`
  margin-top: 1.25rem;
  padding-left: 0.25rem;
  min-height: 12rem;
`;

export const Title = styled.h3`
  color: #3f3f3f;
  font-size: 1rem;
  font-weight: 700;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.9375rem;
`;

export const Item = styled.li``;

export const Button = styled.button`
  color: #454545;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 16px;
  background: #eceff2;
  padding: 0.5rem 0.75rem;

  &:hover {
    background-color: #007bff;
    color: #fff;
    --close-icon-color: #fff;
  }
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 0.125rem;
  border-radius: 4px;
`;

export const Icon = styled.img`
  width: 1rem;
  aspect-ratio: 1/1;
`;
