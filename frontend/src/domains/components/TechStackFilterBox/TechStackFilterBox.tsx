import type { ArticleSectorKey } from "@domains/filter/articleSector";
import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import * as S from "./TechStackFilterBox.styled";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
  sector?: ArticleSectorKey;
}

function TechStackFilterBox({ onSelect, sector }: TechStackFilterBoxProps) {
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
