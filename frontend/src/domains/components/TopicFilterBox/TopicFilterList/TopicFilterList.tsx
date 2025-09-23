import { useGetSectorLocation } from "@domains/hooks/useGetSectorLocation";
import { getTopicsBySector } from "@domains/utils/sectorHandlers";
import TopicFilterButton from "./TopicFilterButton/TopicFilterButton";
import * as S from "./TopicFilterList.styled";

interface TopicFilterListProps {
  onSelect: () => void;
}

function TopicFilterList({ onSelect }: TopicFilterListProps) {
  const sector = useGetSectorLocation();

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
