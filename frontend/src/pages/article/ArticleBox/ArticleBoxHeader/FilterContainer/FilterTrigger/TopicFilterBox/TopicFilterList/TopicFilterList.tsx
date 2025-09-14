import {
  BACKEND_TOPIC_ENTRY,
  COMMON_TOPIC_ENTRY,
  FRONTEND_TOPIC_ENTRY,
  INFRA_TOPIC_ENTRY,
  NON_TECH_TOPIC_ENTRY,
  TOPIC_ENTRY,
} from "@domains/filter/topic";
import { useLocation } from "react-router";
import TopicFilterButton from "./TopicFilterButton/TopicFilterButton";
import * as S from "./TopicFilterList.styled";

interface TopicFilterListProps {
  onSelect: () => void;
}

function getTopicsBySector(sector: string | null) {
  switch (sector) {
    case "fe":
      return [...COMMON_TOPIC_ENTRY, ...FRONTEND_TOPIC_ENTRY];
    case "be":
      return [...COMMON_TOPIC_ENTRY, ...BACKEND_TOPIC_ENTRY];
    case "infra":
      return [...COMMON_TOPIC_ENTRY, ...INFRA_TOPIC_ENTRY];
    case "nonTech":
      return [...COMMON_TOPIC_ENTRY, ...NON_TECH_TOPIC_ENTRY];
    case "Android":
    case "ios":
      return COMMON_TOPIC_ENTRY;
    case "all":
    case null:
    case undefined:
      return TOPIC_ENTRY;
    default:
      return TOPIC_ENTRY;
  }
}

function TopicFilterList({ onSelect }: TopicFilterListProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sector = params.get("sector");

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
