import type { ArticleFormDataType } from "@domains/components/ArticleSubmission/types";
import { ARTICLE_SECTOR_ENTRY } from "@domains/filter/articleSector";
import {
  getTechStackBySector,
  getTopicsBySector,
} from "@domains/utils/sectorHandlers";
import SelectionInputFormField from "../SelectionInputFormField/SelectionInputFormField";

function SectorFormField({
  formData,
  onChange,
}: {
  formData: ArticleFormDataType;
  onChange: <K extends keyof ArticleFormDataType>(
    field: K,
    value: ArticleFormDataType[K],
  ) => void;
}) {
  const techStackEntry = getTechStackBySector(formData.sector);
  const topicEntry = getTopicsBySector(formData.sector);
  const sectorEntriesWithoutAll = ARTICLE_SECTOR_ENTRY.filter(
    ([key]) => key !== "all",
  );

  const isSectorAll = formData.sector === "all";
  const isNonTech = formData.sector === "nonTech";
  return (
    <>
      <SelectionInputFormField
        entries={sectorEntriesWithoutAll}
        title="직군 선택"
        name="sector"
        type="radio"
        value={formData.sector}
        onChange={(next) =>
          onChange("sector", next as ArticleFormDataType["sector"])
        }
      />
      {!(isSectorAll || isNonTech) && (
        <SelectionInputFormField
          entries={techStackEntry}
          title="기술스택"
          name="techStacks"
          type="checkbox"
          value={formData.techStacks}
          onChange={(next) =>
            onChange("techStacks", next as ArticleFormDataType["techStacks"])
          }
        />
      )}
      {!isSectorAll && (
        <SelectionInputFormField
          entries={topicEntry}
          title="주제"
          name="techStacks"
          type="checkbox"
          value={formData.topics}
          onChange={(next) =>
            onChange("topics", next as ArticleFormDataType["topics"])
          }
        />
      )}
    </>
  );
}

export default SectorFormField;
