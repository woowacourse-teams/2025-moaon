import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import * as S from "./TechStackFilterBox.styled";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  return (
    <>
      <TechStackSearchBar onSelect={onSelect} />
      <S.Container>
        <RecommendTechStack onSelect={onSelect} />
        <SelectedTechStack onSelect={onSelect} />
      </S.Container>
    </>
  );
}

export default TechStackFilterBox;
