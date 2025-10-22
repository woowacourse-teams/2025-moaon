import styled from "@emotion/styled";
import { Player } from "@lottiefiles/react-lottie-player";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const AnimationPlayer = styled(Player)<{ translateY: number }>`
  width: 24.25rem;
  height: 20.125rem;
  transform: ${({ translateY }) => `translateY(${translateY}px)`};

  ${BP_768} {
    width: 16rem;
    height: 12.625rem;
    transform: translateY(0.4rem);
  }

  ${BP_480} {
    width: 10rem;
    height: 9rem;
    transform: translateY(0.3rem);
  }
`;
