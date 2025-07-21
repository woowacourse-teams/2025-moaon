import fillHeart from "@assets/icons/fill-heart.svg";
import view from "@assets/icons/view.svg";
import ActivityBox from "./ActivityBox/ActivityBox";
import * as S from "./Card.styled";
import PlatformList from "./PlatformList/PlatformList";
import TechStackList from "./TechStackList/TechStackList";

function Card() {
  return (
    <S.Card>
      {/* 상세 페이지 url 나오면 바꿔야함 */}
      <S.CardLink to="/list">
        <S.CardImageBox>
          <S.CardImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxpHj-C91UtW23X_jH7TDSFaG9Q3GlsqB_sw&s" />
          <PlatformList platforms={["1"]} />
        </S.CardImageBox>
        <S.CardInfo>
          <S.CardTitle>모아온</S.CardTitle>
          <S.CardSummary>프로젝트를 모아 모아 모아온</S.CardSummary>
          <TechStackList techStacks={["1", "2", "", "1", ""]} />
          <S.CardFooter>
            <S.GroupText>우아한테크코스</S.GroupText>
            <S.Wrap>
              <ActivityBox
                icon={<S.ActivityIcon src={fillHeart} alt="좋아요 아이콘" />}
                count={5000}
              />
              <ActivityBox
                icon={<S.ActivityIcon src={view} alt="조회수 아이콘" />}
                count={300}
              />
            </S.Wrap>
          </S.CardFooter>
        </S.CardInfo>
      </S.CardLink>
    </S.Card>
  );
}

export default Card;
