import styled from "@emotion/styled";
import { BP_480 } from "@/styles/global.styled";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Video = styled.video`
  width: 650px;

  ${BP_480} {
    width: 500px;
  }
`;
