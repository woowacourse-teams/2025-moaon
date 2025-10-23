import * as S from "./OrdinalFilterBox.styled";
import OrdinalFilterList from "./OrdinalFilterList/OrdinalFilterList";

interface OrdinalFilterBoxProps {
  onSelect: () => void;
}

function OrdinalFilterBox({ onSelect }: OrdinalFilterBoxProps) {
  return (
    <>
      <S.Title>기수 선택</S.Title>
      <OrdinalFilterList onSelect={onSelect} />
    </>
  );
}

export default OrdinalFilterBox;
