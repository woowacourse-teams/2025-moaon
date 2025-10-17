import styled from "@emotion/styled";
import { Player } from "@lottiefiles/react-lottie-player";
import { BP_480, BP_768 } from "@/styles/global.styled";

export const AnimationPlayer = styled(Player)<{ translateY: number }>`
  width: 31.25rem;
  height: 450px;
  transform: ${({ translateY }) => `translateY(${translateY}px)`};

  ${BP_768} {
    width: 28.125rem;
    height: 25rem;
    padding: 0 1rem;
    transform: translateY(-1.875rem);
  }

  ${BP_480} {
    width: 20.3125rem;
    height: 17.1875rem;
  }
`;
