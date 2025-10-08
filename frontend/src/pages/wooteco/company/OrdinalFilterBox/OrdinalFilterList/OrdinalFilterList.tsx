import OrdinalFilterButton from "./OrdinalFilterButton/OrdinalFilterButton";
import * as S from "./OrdinalFilterList.styled";

interface OrdinalFilterListProps {
  onSelect: () => void;
}

const 우테코기수 = [
  { label: "2기", value: "2" },
  { label: "3기", value: "3" },
  { label: "4기", value: "4" },
  { label: "5기", value: "5" },
  { label: "6기", value: "6" },
];

function OrdinalFilterList({ onSelect }: OrdinalFilterListProps) {
  return (
    <S.List>
      {우테코기수.map(({ label, value }) => (
        <OrdinalFilterButton
          key={value}
          value={value}
          label={label}
          onSelect={onSelect}
        />
      ))}
    </S.List>
  );
}

export default OrdinalFilterList;
