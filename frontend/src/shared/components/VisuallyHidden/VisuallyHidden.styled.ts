import styled from "@emotion/styled";
import Polymorphic from "../Polymorphic/Polymorphic";

export const Container = styled(Polymorphic)`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:focus-within {
    position: absolute;
    width: 480px;
    height: auto;
    margin: 0 auto;
    overflow: visible;
    clip: auto;
    white-space: normal;
    background-color: #1f6feb;
    color: #fff;
    padding: 16px;
    z-index: 1000;
  }
`;
