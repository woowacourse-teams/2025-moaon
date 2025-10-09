import styled from "@emotion/styled";
import { Link } from "react-router";

export const Trigger = styled(Link)`
  perspective: 1200px;
  width: 350px;
  height: 430px;
  margin: 20px auto;
`;

export const Card = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  user-select: none;
`;

export const FrontSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.2);
`;

export const Image = styled.img`
  width: 100%;
`;

export const BackSide = styled.div<{ position: "fe" | "be" }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.2);
  background: ${({ position }) =>
    position === "be"
      ? `linear-gradient(
    to right bottom,
    #469fab,
    #3eb6af,
    #55cca7,
    #82df96,
    #baee81
  )`
      : `linear-gradient(
    to right bottom,
    #fe7120,
    #ff7f56,
    #ff9280,
    #ffa7a5,
    #ffbec3
  );`};
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

export const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
`;
