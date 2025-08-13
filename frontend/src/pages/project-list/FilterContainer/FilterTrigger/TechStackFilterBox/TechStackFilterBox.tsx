import FilterBox from "../FilterBox/FilterBox";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import * as S from "./TechStackFilterBox.styled";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  return (
    <FilterBox param="techStacks" onSelect={onSelect}>
      <TechStackSearchBar onSelect={onSelect} />
      <S.Container>
        <RecommendTechStack onSelect={onSelect} />
        <SelectedTechStack onSelect={onSelect} />
      </S.Container>
    </FilterBox>
  );
}

export default TechStackFilterBox;
