import * as S from "./TopicFilterBox.styled";
import TopicFilterList from "./TopicFilterList/TopicFilterList";

interface TopicFilterBoxProps {
  onSelect: () => void;
}

function TopicFilterBox({ onSelect }: TopicFilterBoxProps) {
  return (
    <>
      <S.Title>주제 선택</S.Title>
      <TopicFilterList onSelect={onSelect} />
    </>
  );
}

export default TopicFilterBox;
