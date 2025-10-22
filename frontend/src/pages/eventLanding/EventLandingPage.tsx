import ArrowIcon from "@shared/components/ArrowIcon/ArrowIcon";
import { COMPANY_LIST, COMPANY_NAME } from "../wooteco/constants/company";
import * as S from "./EventLandingPage.styled";

function EventLandingPage() {
  const arrowRef = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scrollTop / windowHeight) * 100;

      const opacity = Math.max(0, 1 - scrollPercent / 50);
      node.style.opacity = String(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  const handleArrowClick = () => {
    const event1Element = document.getElementById("event1");
    if (event1Element) {
      const isMobile = window.innerWidth <= 768;
      event1Element.scrollIntoView({
        behavior: "smooth",
        block: isMobile ? "start" : "center",
      });
    }
  };

  const attachedRef = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.animation = "fadeIn 0.75s forwards ease-in-out";
          return;
        }

        node.style.animation = "";
      },
      { threshold: 0.05 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      node.style.animation = "";
    };
  };

  return (
    <>
      <S.Header>
        <S.Nav>
          <S.NavBox>
            <S.LogoText>모아온</S.LogoText>
            <S.LinkContainer>
              <S.LinkBox>
                <S.Link to="/project">프로젝트 탐색</S.Link>
              </S.LinkBox>
              <S.LinkBox>
                <S.Link to="/article">아티클 탐색</S.Link>
              </S.LinkBox>
            </S.LinkContainer>
          </S.NavBox>
          <S.RegisterLink to="/register">등록하기</S.RegisterLink>
        </S.Nav>
      </S.Header>

      <S.Container>
        <S.Section1>
          <S.Title1>
            양방향으로 <br /> 탐색하는 <br />{" "}
            <S.PointText>
              새로운{" "}
              <S.TextEffect src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/text-effect.avif" />
            </S.PointText>{" "}
            경험
          </S.Title1>
          <S.LinkIconBox>
            <S.LinkIcon src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/hero.svg" />
          </S.LinkIconBox>
          <S.ArrowDownIcon
            onClick={handleArrowClick}
            ref={arrowRef}
            src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/arrow-down.svg"
            alt=""
          />
        </S.Section1>

        <S.EventBox>
          <S.Section2 id="event1" ref={attachedRef}>
            <S.EffectImage1
              src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/effect6.svg"
              alt=""
            />
            <S.Badge bgColor="#46ec8821" color="#48ec8b">
              Event 1
            </S.Badge>
            <S.Title2 color="#48ec8b">Big Tech</S.Title2>
            <S.Description2 color="#4bec8bb3">
              우아한테크코스 출신 <S.BR550 /> 빅테크 기업 <S.BR768_550 />{" "}
              개발자들의 <S.BR550 />
              프로젝트 보러가기
            </S.Description2>
            <S.CardContainer>
              {COMPANY_LIST.map((company) => {
                const imageurl =
                  company === "toss" ? "toss-text1.svg" : `${company}-text.svg`;
                return (
                  <S.CardBox key={company}>
                    <S.CardLink to={`/wooteco/${company}`}>
                      <S.CardImage
                        src={`https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/${imageurl}`}
                        alt=""
                      />
                      {COMPANY_NAME[company]}
                    </S.CardLink>
                  </S.CardBox>
                );
              })}
            </S.CardContainer>
            <S.BigTechButtonContainer>
              <S.BigTechButtonBox>
                <S.BigTechButton to={"/wooteco"}>
                  빅테크 기업 모아보기
                </S.BigTechButton>
              </S.BigTechButtonBox>
            </S.BigTechButtonContainer>
          </S.Section2>

          <S.Section2 ref={attachedRef}>
            <S.EffectImage2
              src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/effect12.svg"
              alt=""
            />
            <S.Badge bgColor="#478bff26" color="#478bff">
              Event 2
            </S.Badge>
            <S.Title2 color="#478bff">Coach</S.Title2>
            <S.Description2 color="#478bffcc">
              우아한테크코스 크루 출신 <S.BR768 /> 코치들의 프로젝트 보러가기
            </S.Description2>

            <S.CoachContainer>
              <S.CoachBox>
                <S.CoachLink to={"/project/64"}>
                  <S.CoachImage
                    src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/kkogkkog-logo.svg"
                    alt=""
                  />
                  <S.CoachTextBox>
                    <S.CoachName color="#ff7020">FE 코치 시지프</S.CoachName>
                    <ArrowIcon direction="right" color="#ababab" />
                  </S.CoachTextBox>
                </S.CoachLink>
              </S.CoachBox>

              <S.CoachBox>
                <S.CoachLink to={"/project/71"}>
                  <S.CoachImage
                    src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/cvi-logo.svg"
                    alt=""
                  />
                  <S.CoachTextBox>
                    <S.CoachName color="#469FAB">BE 코치 검프</S.CoachName>
                    <ArrowIcon direction="right" color="#ababab" />
                  </S.CoachTextBox>
                </S.CoachLink>
              </S.CoachBox>
            </S.CoachContainer>
          </S.Section2>

          <S.Section2 ref={attachedRef}>
            <S.EffectImage3
              src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/effect9.svg"
              alt=""
            />
            <S.Badge bgColor="#ddf4571a" color="#ddf34f">
              Event 3
            </S.Badge>
            <S.Title2 color="#ddf34f">Feedback</S.Title2>
            <S.Description2 color="#ddf34fb3">
              피드백을 작성해주시면 <S.BR768 /> 추첨을 통해 10분을 선정하여{" "}
              <br /> 소정의 상품을 증정하겠습니다.
            </S.Description2>
            <S.FeedbackBox>
              <S.FeedbackLinkBox>
                <S.FeedbackLink href="https://smore.im/form/vNZW1lFlu8">
                  피드백 하러가기
                </S.FeedbackLink>
              </S.FeedbackLinkBox>
            </S.FeedbackBox>
          </S.Section2>

          {/* <S.Section2>
            <S.EffectImage2
              src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/effect8.svg"
              alt=""
            />
            <S.Badge bgColor="#a855f71a" color="#a855f7">
              Event 4
            </S.Badge>
            <S.Title2 color="#a855f7">파랑</S.Title2>
            <S.Description2 color="#a855f7b3">
              피드백을 작성해주시면 추첨을 통해 10분을 선정하여 소정의 상품을
              증정하겠습니다.
            </S.Description2>
          </S.Section2>

          <S.Section2>
            <S.Badge bgColor="#fbbf241f" color="#fbbf24">
              Event 5
            </S.Badge>

            <S.Title2 color="#fbbf24">앰버</S.Title2>
            <S.Description2 color="#fbbf24cc">
              피드백을 작성해주시면 추첨을 통해 10분을 선정하여 소정의 상품을
              증정하겠습니다.
            </S.Description2>
          </S.Section2>

          <S.Section2>
            <S.Badge bgColor="#1dd3b01f" color="#1dd3b0">
              Event 2
            </S.Badge>
            <S.Title2 color="#1dd3b0">Coach</S.Title2>
            <S.Description2 color="#1dd3b0b3">
              우아한테크코스 크루 출신 코치들의 프로젝트 보러가기
            </S.Description2>
          </S.Section2> */}
        </S.EventBox>
      </S.Container>
    </>
  );
}

export default EventLandingPage;
