import type { ArticleSectorKey } from "@domains/filter/articleSector";
import * as S from "./TopicFilterBox.styled";
import TopicFilterList from "./TopicFilterList/TopicFilterList";

interface TopicFilterBoxProps {
  onSelect: () => void;
  sector: ArticleSectorKey;
}

function TopicFilterBox({ onSelect, sector }: TopicFilterBoxProps) {
  return (
    <>
      <S.Title>주제 선택</S.Title>
      <TopicFilterList onSelect={onSelect} sector={sector} />
    </>
  );
}

export default TopicFilterBox;
