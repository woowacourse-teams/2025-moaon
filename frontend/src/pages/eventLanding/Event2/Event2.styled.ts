import styled from "@emotion/styled";

export const Container = styled.div`
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  line-height: 1.6;
  margin-top: 1rem;
`;

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3rem;
`;

export const Box = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #d2d2d2;

  &:last-of-type {
    border-right: none;
  }
`;

export const SubTitle = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const infoText = styled.p`
  color: #666;
  font-size: 1rem;
  margin-top: 1rem;
`;
