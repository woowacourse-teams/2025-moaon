import * as S from "./Card.styled";

function Card() {
  return (
    <S.Card>
      {/* 상세 페이지 url 나오면 바꿔야함 */}
      <S.CardLink to="/list">
        <S.CardImageBox>
          <S.CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpHj-C91UtW23X_jH7TDSFaG9Q3GlsqB_sw&s" />
        </S.CardImageBox>
        <S.CardInfo>
          <S.CardTitle>모아온모아온모아온모아온모아온</S.CardTitle>
          <S.CardSummary>
            프로젝트를 모아 모아 모아온프로젝트를 모아 모아 모아온프로젝트를
            모아 모아 모아온
          </S.CardSummary>
          <S.TechStackList>
            <S.TechStack>React</S.TechStack>
            <S.TechStack>React</S.TechStack>
            <S.TechStack>React</S.TechStack>
          </S.TechStackList>
          <S.CardFooter>
            <S.GroupText>우아한테크코스</S.GroupText>
            <S.Wrap>
              <S.LikeBox>100</S.LikeBox>
              <S.LikeBox>300</S.LikeBox>
            </S.Wrap>
          </S.CardFooter>
        </S.CardInfo>
      </S.CardLink>
    </S.Card>
  );
}

export default Card;
