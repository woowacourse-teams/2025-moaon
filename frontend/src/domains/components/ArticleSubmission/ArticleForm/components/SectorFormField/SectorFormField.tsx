import type { SectorType } from "@domains/components/ArticleSubmission/types";
import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import type { TechStackKey } from "@domains/filter/techStack";
import {
  getTechStackBySector,
  getTopicsBySector,
} from "@domains/utils/sectorHandlers";
import SelectionInputFormField from "../SelectionInputFormField/SelectionInputFormField";

interface SectorFormFieldProps {
  sector: SectorType;
  onChange: <K extends keyof SectorType>(
    subField: K,
    subValue: SectorType[K],
  ) => void;
  errors?: {
    sectorValue?: string;
    techStacks?: string;
    topics?: string;
  };
}

function SectorFormField({ sector, onChange, errors }: SectorFormFieldProps) {
  const sectorEntriesWithoutAll = ARTICLE_SECTOR_ENTRY.filter(
    ([key]) => key !== "all",
  );

  const techStackEntry = getTechStackBySector(sector.value);
  const topicEntry = getTopicsBySector(sector.value);

  const isSectorAll = sector.value === "all";
  const isNonTech = sector.value === "nonTech";

  const handleSectorValueChange = (next: ArticleSectorKey) => {
    onChange("value", next);
    onChange("techStacks", [] as TechStackKey[]);
    onChange("topics", [] as AllTopicKey[]);
  };

  return (
    <>
      <SelectionInputFormField
        entries={sectorEntriesWithoutAll}
        title="직군 선택"
        name="sector"
        type="radio"
        value={sector.value}
        onChange={(next) => handleSectorValueChange(next as ArticleSectorKey)}
        errorMessage={errors?.sectorValue}
      />
      {!(isSectorAll || isNonTech) && (
        <SelectionInputFormField
          entries={techStackEntry}
          title="기술스택"
          name="techStacks"
          type="checkbox"
          value={sector.techStacks}
          onChange={(next) => onChange("techStacks", next as TechStackKey[])}
          errorMessage={errors?.techStacks}
        />
      )}
      {!isSectorAll && (
        <SelectionInputFormField
          entries={topicEntry}
          title="주제"
          name="topics"
          type="checkbox"
          value={sector.topics}
          onChange={(next) => onChange("topics", next as AllTopicKey[])}
          errorMessage={errors?.topics}
        />
      )}
    </>
  );
}

export default SectorFormField;
