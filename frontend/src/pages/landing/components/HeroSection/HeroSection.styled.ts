import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

export const HeroSection = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const HeroPicture = styled.picture`
  display: block;
  width: 100%;
`;

export const HeroImage = styled.img`
  display: block;
  width: 100%;
  height: calc(100dvh - 4.75rem);
  object-fit: cover;
  object-position: center;
`;

export const Dim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.35) 35%,
    rgba(0, 0, 0, 0.15) 55%,
    rgba(0, 0, 0, 0) 75%
  );
  pointer-events: none;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  padding-top: 8rem;
`;

export const OverlayInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  color: #ffffff;
`;

export const Tagline = styled.p`
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
  opacity: 0.9;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: 700;
`;

export const Description = styled.p`
  margin-bottom: 4rem;
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.9;
`;

export const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  padding: 0 1rem;
  border-radius: 9999px;
  background: #6c63ff;
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(108, 99, 255, 0.35);
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(108, 99, 255, 0.45);
  }
`;

const floatAnimation = keyframes`
  0% {
    transform: translateY(0px);
    opacity: 1;
  }
  30% {
    transform: translateY(0px);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px);
    opacity: 0.3;
  }
  70% {
    transform: translateY(0px);
    opacity: 1;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const ArrowIcon = styled.img`
  position: absolute;
  bottom: 36px;
  width: 64px;
  animation: ${floatAnimation} 3.5s ease-in-out infinite;

  @media (max-width: 768px) {
    bottom: 30px;
    width: 40px;
  }
`;
