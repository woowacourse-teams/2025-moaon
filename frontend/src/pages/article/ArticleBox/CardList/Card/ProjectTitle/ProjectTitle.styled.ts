import styled from "@emotion/styled";

export const ProjectTitle = styled.p<{ color: string }>`
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  font-weight: 700;
`;
