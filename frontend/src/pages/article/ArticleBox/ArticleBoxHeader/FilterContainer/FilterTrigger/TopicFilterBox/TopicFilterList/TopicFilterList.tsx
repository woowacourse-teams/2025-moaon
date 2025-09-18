import { getTopicsBySector } from "@/pages/article/utils/sectorHandlers";
import TopicFilterButton from "./TopicFilterButton/TopicFilterButton";
import * as S from "./TopicFilterList.styled";

interface TopicFilterListProps {
  onSelect: () => void;
  sector: string | null;
}

function TopicFilterList({ onSelect, sector }: TopicFilterListProps) {
  return (
    <S.List>
      {getTopicsBySector(sector).map(([key, { label }]) => (
        <TopicFilterButton
          key={key}
          label={label}
          value={key}
          onSelect={onSelect}
        />
      ))}
    </S.List>
  );
}

export default TopicFilterList;
