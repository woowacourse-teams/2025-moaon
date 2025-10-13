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
import type { FormDataType } from "../types";
import * as S from "./ArticleForm.styled";
import FormField from "./components/FormField/FormField";
import TagList from "./components/TagList/TagList";
import { useArticleForm } from "./hooks/useArticleForm";

interface ArticleFormProps {
  onFormSubmit: (data: FormDataType) => void;
  editingData?: FormDataType;
  onUpdate?: (data: FormDataType) => void;
  onCancel?: () => void;
}

function ArticleForm({
  onFormSubmit,
  editingData,
  onUpdate,
  onCancel,
}: ArticleFormProps) {
  const { formData, setFormData, handlers } = useArticleForm({
    editingData,
    onSubmit: onFormSubmit,
    onUpdate,
    onCancel,
  });
  const techStackEntry = getTechStackBySector(formData.sector);
  const topicEntry = getTopicsBySector(formData.sector);
  const sectorEntriesWithoutAll = ARTICLE_SECTOR_ENTRY.filter(
    ([key]) => key !== "all",
  );
  const isSectorAll = formData.sector === "all";
  const isNonTech = formData.sector === "nonTech";
  return (
    <S.FormBox>
      <S.FormTitle>
        {editingData ? "아티클 수정" : "새 아티클 추가"}
      </S.FormTitle>
      <S.FormFieldList>
        <FormField title="아티클 주소">
          <S.ArticleAddressBox>
            <input
              type="text"
              name="address"
              placeholder="https://moaon.co.kr"
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            <S.ArticleAddressButton
              type="button"
              onClick={handlers.handleFetchMeta}
            >
              가져오기
            </S.ArticleAddressButton>
          </S.ArticleAddressBox>
        </FormField>
        <FormField title="아티클 제목">
          <input
            type="text"
            name="title"
            placeholder="아티클 제목을 입력해주세요."
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </FormField>
        <FormField title="아티클 내용">
          <textarea
            name="description"
            placeholder="아티클 내용 요약.."
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </FormField>
        <FormField title="직군 선택">
          <TagList<ArticleSectorKey>
            entries={sectorEntriesWithoutAll}
            onSelect={handlers.updateSectorParams}
            isActive={(data) => data === formData.sector}
          />
        </FormField>
        {!(isSectorAll || isNonTech) && (
          <FormField title="기술스택">
            <TagList<TechStackKey>
              entries={techStackEntry}
              onSelect={handlers.toggleTechStack}
              isActive={(data) => formData.techStacks.includes(data)}
            />
          </FormField>
        )}
        {!isSectorAll && (
          <FormField title="주제">
            <TagList<AllTopicKey>
              entries={topicEntry}
              onSelect={handlers.toggleTopic}
              isActive={(data) => formData.topics.includes(data)}
            />
          </FormField>
        )}
      </S.FormFieldList>
      <S.ArticleButtonList>
        <S.ArticleAddButton type="button" onClick={handlers.handleSubmit}>
          {editingData ? "아티클 수정" : "+ 아티클 추가"}
        </S.ArticleAddButton>
        {editingData && onCancel && (
          <S.ArticleCancelButton type="button" onClick={handlers.handleCancel}>
            취소
          </S.ArticleCancelButton>
        )}
      </S.ArticleButtonList>
    </S.FormBox>
  );
}

export default ArticleForm;
