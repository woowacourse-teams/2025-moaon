import styled from "@emotion/styled";

export const ProjectTitle = styled.p<{ bgColor: string }>`
  color: ${(props) => props.bgColor};
  display: flex;
  align-items: center;
  font-weight: 700;
`;
