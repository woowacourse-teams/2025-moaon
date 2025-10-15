import styled from "@emotion/styled";
import { BP_480 } from "@/styles/global.styled";

export const Background = styled.div<{ bgColor: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: ${({ bgColor }) => bgColor};
`;

export const LogoBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  opacity: 0;
  animation: fadeIn 1s forwards;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export const LogoGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #fff, transparent);
  filter: blur(40px);
  opacity: 0.6;
  z-index: -1;
  animation: pulse 2s ease-in-out backwards;

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    60% {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }

  ${BP_480} {
    width: 250px;
    height: 250px;
  }
`;

export const LogoImage = styled.img`
  width: 250px;
  aspect-ratio: 1/1;

  ${BP_480} {
    width: 200px;
  }
`;

export const ShineBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  width: 350px;

  ${BP_480} {
    width: 250px;
  }
`;

export const ShineImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;

  mask-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 35%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 65%
  );
  mask-size: 250% 100%;
  mask-position: -100% 0;
  mask-repeat: no-repeat;
  -webkit-mask-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 35%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 65%
  );
  -webkit-mask-size: 250% 100%;
  -webkit-mask-position: -100% 0;
  -webkit-mask-repeat: no-repeat;
  animation: shine 2.5s linear;

  @keyframes shine {
    0% {
      -webkit-mask-position: 120% 0;
      mask-position: 120% 0;
    }
    100% {
      -webkit-mask-position: -100% 0;
      mask-position: -100% 0;
    }
  }
`;
