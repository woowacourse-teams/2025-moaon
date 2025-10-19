import * as S from "./A.styled";
import { COMPANY_LIST, COMPANY_NAME } from "./wooteco/constants/company";

function APage() {
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
          <S.Button type="button">등록하기</S.Button>
        </S.Nav>
      </S.Header>

      <S.Container>
        <S.Section1>
          <S.Title1>
            양방향으로 <br /> 탐색하는 <br /> 새로운 경험
          </S.Title1>
          <S.LinkIconBox>
            <S.LinkIcon
              src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/link2.svg"
              alt=""
            />
          </S.LinkIconBox>
          <S.ArrowDownIcon
            onClick={handleArrowClick}
            ref={arrowRef}
            src="https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/wooteco-event/arrow-down.svg"
            alt=""
          />
        </S.Section1>

        <S.Section2 id="event1">
          <S.Badge bgColor="#46ec8821" color="#48ec8b">
            Event 1
          </S.Badge>
          <S.Title2>Big Tech</S.Title2>
          <S.Description2>
            우아한테크코스 출신 빅테크 기업 개발자들의 프로젝트 보러가기
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

        <S.Section2>
          <S.Badge bgColor="#478bff26" color="#478bff">
            Event 2
          </S.Badge>
        </S.Section2>

        <S.Section2>
          <S.Badge bgColor="#ddf4571a" color="#ddf34f">
            Event 3
          </S.Badge>
        </S.Section2>
      </S.Container>
    </>
  );
}

export default APage;
