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

export const Button = styled.button`
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
`;

export const Section1 = styled.section`
  height: 100vh;
  width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${BP_1280} {
    width: 960px;
  }

  ${BP_1024} {
    width: 100%;
    padding: 0 2rem;
  }

  ${BP_768} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 3rem;
  }

  ${BP_480} {
    padding: 0 1rem;
  }
`;

export const Title1 = styled.h1`
  font-size: 6rem;
  font-weight: 500;
  line-height: 1.3;

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

export const LinkIconBox = styled.div`
  transform: translateX(50px);

  ${BP_768} {
    align-self: flex-end;
  }
`;

export const LinkIcon = styled.img`
  width: 400px;
  height: 400px;
  animation: float 4s ease-in-out infinite;

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
    width: 350px;
    height: 350px;
  }

  ${BP_480} {
    width: 300px;
    height: 300px;
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
  width: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section2 = styled.section`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

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
`;

export const Title2 = styled.h2`
  color: #48ec8b;
  font-size: 3rem;
  font-weight: 600;
`;

export const Description2 = styled.p`
  font-size: 1.25rem;
  color: #4bec8bb3;
  font-weight: 400;
  word-break: keep-all;
  line-height: 1.5;
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
      rgba(255, 255, 255, 0.02) 100%
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
      rgba(255, 255, 255, 0.08) 100%
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

export const BigTechButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
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
