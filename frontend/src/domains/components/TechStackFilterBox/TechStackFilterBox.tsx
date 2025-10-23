import RecommendTechStack from "./RecommendTechStack/RecommendTechStack";
import SelectedTechStack from "./SelectedTechStack/SelectedTechStack";
import TechStackSearchBar from "./TechStackSearchBar/TechStackSearchBar";

interface TechStackFilterBoxProps {
  onSelect: () => void;
}

function TechStackFilterBox({ onSelect }: TechStackFilterBoxProps) {
  return (
    <>
      <TechStackSearchBar onSelect={onSelect} />
      <RecommendTechStack onSelect={onSelect} />
      <SelectedTechStack onSelect={onSelect} />
    </>
  );
}

export default TechStackFilterBox;
