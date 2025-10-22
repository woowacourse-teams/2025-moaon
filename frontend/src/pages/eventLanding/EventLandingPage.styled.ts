import styled from "@emotion/styled";
import { Link as ReactRouterLink } from "react-router";
import {
  BP_480,
  BP_768,
  BP_1024,
  BP_1280,
  hoverUnderline,
} from "@/styles/global.styled";

export const BR768 = styled.br`
  display: none;

  ${BP_768} {
    display: block;
  }
`;

export const BR768_550 = styled.br`
  display: none;

  @media (max-width: 768px) and (min-width: 551px) {
    display: block;
  }
`;

export const BR550 = styled.br`
  display: none;

  @media (max-width: 550px) {
    display: block;
  }
`;

export const BR480 = styled.br`
  display: none;

  ${BP_480} {
    display: block;
  }
`;

export const Header = styled.header`
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #333;
  color: #fbfbfb;
  height: 3.75rem;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  font-size: 1.125rem;
  z-index: 998;
`;

export const Nav = styled.nav`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  ${BP_1280} {
    width: 960px;
  }

  ${BP_1024} {
    width: 100%;
    padding: 0 2rem;
  }

  ${BP_480} {
    padding: 0 1rem;
  }
`;

export const NavBox = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

export const LogoText = styled.p`
  font-weight: 600;

  ${BP_480} {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkBox = styled.p`
  padding: 0 1.25rem;

  &:first-of-type {
    border-right: 1px solid #999;
  }

  ${BP_480} {
    &:first-of-type {
      padding: 0;
      padding-right: 1.25rem;
    }
  }
`;

export const Link = styled(ReactRouterLink)`
  color: #fbfbfb;
  font-size: 1rem;
  text-decoration: none;
  ${hoverUnderline("#fbfbfb")}

  ${BP_480} {
    font-size: 0.875rem;
  }
`;

export const RegisterLink = styled(ReactRouterLink)`
  color: #fbfbfb;
  font-size: 1rem;

  ${BP_480} {
    font-size: 0.875rem;
  }
`;

export const Container = styled.div`
  color: #fbfbfb;
  min-height: 100vh;
  height: auto;
  background-color: #000;
  background: url("https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/background.png")
    no-repeat center fixed;
  background-size: cover;
  display: flex;
  flex-direction: column;
  gap: 10rem;

  ${BP_768} {
    gap: 7rem;
  }

  ${BP_480} {
    gap: 5rem;
  }
`;

export const Section1 = styled.section`
  height: 100vh;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  ${BP_1280} {
    width: 960px;
  }

  ${BP_1024} {
    width: 100%;
    padding: 3rem 2rem 0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  ${BP_768} {
    gap: 1.5rem;
  }

  ${BP_480} {
    padding: 0 1rem;
  }
`;

export const Title1 = styled.h1`
  font-size: 6rem;
  font-weight: 600;
  line-height: 1.3;
  color: #fff;

  ${BP_1024} {
    font-size: 4.5rem;
  }

  ${BP_768} {
    font-size: 4rem;
    padding-left: 1rem;
  }

  ${BP_480} {
    font-size: 3rem;
  }
`;

export const PointText = styled.span`
  position: relative;
  background: linear-gradient(
    20deg,
    rgba(75, 236, 139, 1) 0%,
    rgba(255, 255, 255, 1) 85%,
    rgba(255, 255, 255, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

export const TextEffect = styled.img`
  position: absolute;
  bottom: -80px;
  left: -30px;
  width: 300px;
  transform: rotate(-5deg);

  ${BP_1024} {
    bottom: -65px;
    width: 240px;
  }

  ${BP_768} {
    bottom: -60px;
    width: 220px;
  }

  ${BP_480} {
    bottom: -50px;
    width: 180px;
  }
`;

export const LinkIconBox = styled.div`
  ${BP_1024} {
    width: 100px;
    height: 500px;
  }

  ${BP_768} {
    align-self: flex-end;
  }

  ${BP_480} {
    height: 300px;
  }
`;

export const LinkIcon = styled.img`
  width: 650px;
  height: 650px;
  animation: float 4s ease-in-out infinite;
  position: absolute;
  top: 220px;
  right: -150px;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  ${BP_1024} {
    width: 550px;
    height: 550px;
    top: 350px;
    right: 0;
  }

  ${BP_768} {
    width: 500px;
    height: 500px;
    top: 400px;
  }

  ${BP_480} {
    width: 375px;
    height: 375px;
    top: 425px;
  }
`;

export const ArrowDownIcon = styled.img`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 56px;
  animation: bounce 2s infinite;
  opacity: 0.7;
  cursor: pointer;

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-20px);
    }
  }
`;

export const Badge = styled.div<{ bgColor: string; color: string }>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  display: inline-block;
  font-size: 1.125rem;
  width: 98px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${BP_480} {
    font-size: 1rem;
    width: 90px;
  }
`;

export const EventBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22rem;

  ${BP_1024} {
    gap: 17rem;
  }

  ${BP_768} {
    gap: 12rem;
  }

  ${BP_480} {
    gap: 7rem;
  }
`;

export const Section2 = styled.section`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  opacity: 0;
  padding: 1rem 0;
  min-height: 450px;

  ${BP_1280} {
    width: 960px;
  }

  ${BP_1024} {
    width: 100%;
    padding: 5rem 2rem 0;
  }

  ${BP_768} {
  }

  ${BP_480} {
    padding: 5rem 1rem 0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const EffectImage1 = styled.img`
  width: 500px;
  height: 500px;
  position: absolute;
  top: -125px;
  right: 0;

  ${BP_1024} {
    width: 390px;
    height: 390px;
    top: 0px;
  }

  ${BP_768} {
    width: 300px;
    height: 300px;
    top: 50px;
  }

  @media (max-width: 550px) {
    width: 280px;
    height: 280px;
    top: 75px;
  }

  ${BP_480} {
    width: 200px;
    height: 200px;
    right: 0;
    top: 70px;
  }
`;

export const Title2 = styled.h2<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 3rem;
  font-weight: 600;

  ${BP_480} {
    font-size: 2.25rem;
  }
`;

export const Description2 = styled.p<{ color: string }>`
  font-size: 1.25rem;
  color: ${({ color }) => color};
  font-weight: 400;
  word-break: keep-all;
  line-height: 1.5;

  ${BP_480} {
    font-size: 1rem;
  }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  ${BP_1024} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${BP_768} {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0rem;
  }
`;

export const CardBox = styled.div`
  backdrop-filter: blur(20px);
  position: relative;
  width: 300px;
  height: 215px;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  padding: 1rem;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0.02) 70%
    );
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.08) 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px);
  }

  &:hover::before {
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }

  ${BP_1024} {
    width: 325px;
  }

  ${BP_768} {
    width: 100%;
  }
`;

export const CardLink = styled(ReactRouterLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CardImage = styled.img`
  width: 150px;
  height: 150px;
`;

export const EffectImage2 = styled.img`
  width: 550px;
  height: 550px;
  position: absolute;
  top: -300px;
  right: 20px;

  ${BP_1280} {
    right: -20px;
  }

  ${BP_1024} {
    width: 450px;
    height: 450px;
    top: -130px;
    right: -35px;
  }

  ${BP_768} {
    width: 350px;
    height: 350px;
    top: -25px;
    right: 0;
  }

  @media (max-width: 550px) {
    width: 275px;
    height: 275px;
    right: -15px;
    top: 30px;
  }

  ${BP_480} {
    width: 170px;
    height: 170px;
    top: 85px;
    right: 0;
  }
`;

export const BigTechButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  ${BP_768} {
    margin-top: 2rem;
  }

  ${BP_480} {
    margin-top: 1rem;
  }
`;

export const BigTechButtonBox = styled(CardBox)`
  height: auto;
  padding: 1.5rem 0;
`;

export const BigTechButton = styled(ReactRouterLink)`
  color: #fbfbfb;
  font-size: 1.125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CoachBox = styled(CardBox)`
  width: 50%;
  height: auto;
  padding: 0;

  ${BP_1024} {
    width: 50%;
  }
`;

export const CoachLink = styled(ReactRouterLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1.25rem 1.25rem 1.25rem 1.75rem;

  ${BP_480} {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
  }
`;

export const CoachName = styled.p<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: 500;
  font-size: 1.125rem;

  @media (max-width: 550px) {
    font-size: 1rem;
  }

  ${BP_480} {
    font-size: 0.875rem;
  }
`;

export const CoachImage = styled.img`
  width: 250px;
  height: 250px;

  ${BP_768} {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 550px) {
    width: 125px;
    height: 125px;
  }

  ${BP_480} {
    width: 100px;
    height: 100px;
  }
`;

export const CoachTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const CoachContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 1rem;

  ${BP_768} {
    margin-top: 0;
    gap: 1rem;
  }
`;

export const EffectImage3 = styled.img`
  width: 450px;
  height: 450px;
  position: absolute;
  top: -40px;
  right: 0;
  z-index: 0;

  ${BP_1280} {
    width: 400px;
    height: 400px;
    top: -70px;
  }

  ${BP_1024} {
    width: 350px;
    height: 350px;
    top: 40px;
    right: 20px;
  }

  @media (max-width: 820px) {
    width: 300px;
    height: 300px;
    top: 80px;
  }

  ${BP_768} {
    width: 225px;
    height: 225px;
    top: 70px;
    right: 0;
  }

  ${BP_480} {
    width: 150px;
    height: 150px;
    top: 110px;
    right: 0;
  }
`;

export const FeedbackBox = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;

  ${BP_768} {
    width: 100%;
  }
`;

export const FeedbackLinkBox = styled.div`
  backdrop-filter: blur(20px);
  position: relative;
  width: 100%;
  height: 60px;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  margin-top: 1rem;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0.02) 70%
    );
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.13) 0%,
      rgba(255, 255, 255, 0.08) 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    opacity: 0;
  }

  &:hover::after {
    opacity: 1;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #555;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #ddf34fb3;
    color: #000;
  }
`;

export const FeedbackLink = styled.a`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  padding: 2rem;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  text-align: center;

  ${BP_480} {
    font-size: 1rem;
  }
`;
