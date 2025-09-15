import styled from "@emotion/styled";

export const WhoSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  background: rgba(0, 123, 255, 0.07);
  color: #000;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  text-align: center;
`;

export const Badge = styled.h3`
  display: inline-block;
  padding: 0.625rem 1.875rem;
  border-radius: 10px;
  background: #007bff;
  color: #ffffff;
  font-weight: 600;
  font-size: 2rem;
`;

export const SubCopy = styled.p`
  margin: 1.75rem auto 0;
  max-width: 720px;
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const Emphasis = styled.h3`
  margin: 5rem auto 0;
  max-width: 1000px;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const Kicker = styled.span`
  color: #007bff;
`;
