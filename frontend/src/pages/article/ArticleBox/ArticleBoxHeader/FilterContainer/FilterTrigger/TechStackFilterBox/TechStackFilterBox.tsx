import { useLocation } from "react-router";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import * as S from "./TechStackFilterBox.styled";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sector = params.get("sector");

  return (
    <>
      <TechStackSearchBar onSelect={onSelect} sector={sector} />
      <S.Container>
        <RecommendTechStack onSelect={onSelect} sector={sector} />
        <SelectedTechStack onSelect={onSelect} />
      </S.Container>
    </>
  );
}

export default TechStackFilterBox;
