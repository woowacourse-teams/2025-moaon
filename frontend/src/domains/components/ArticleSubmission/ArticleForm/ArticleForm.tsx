import { LoadingSpinner } from "@shared/components/LoadingSpinner/LoadingSpinner";
import type { ArticleFormDataType } from "../types";
import * as S from "./ArticleForm.styled";
import InputFormField from "./components/InputFormField/InputFormField";
import InputFormFieldWithButton from "./components/InputFormFieldWithButton/InputFormFieldWithButton";
import SectorFormField from "./components/SectorFormField/SectorFormField";
import TextareaFormField from "./components/TextareaFormField/TextareaFormField";
import { useArticleForm } from "./hooks/useArticleForm";

interface ArticleFormProps {
  onSubmit: (data: ArticleFormDataType) => void;
  editingData?: ArticleFormDataType;
  onUpdate: (data: ArticleFormDataType) => void;
  onCancel: () => void;
}

function ArticleForm({
  onSubmit,
  editingData,
  onUpdate,
  onCancel,
}: ArticleFormProps) {
  const {
    formData,
    isButtonClicked,
    errors,
    isFormValid,
    descriptionToken,
    updateFormFieldData,
    updateNestedField,
    handleMetaDataFetchButtonClick,
    handleSubmit,
    handleCancel,
    loading,
  } = useArticleForm({
    editingData,
    onSubmit,
    onUpdate,
    onCancel,
  });

  return (
    <S.FormBox>
      <S.FormFieldList>
        <InputFormFieldWithButton
          title="아티클 주소"
          name="address"
          placeholder="https://moaon.co.kr"
          type="url"
          value={formData.address}
          onChange={(e) =>
            updateFormFieldData("address", e.target.value.trim())
          }
          buttonEvent={handleMetaDataFetchButtonClick}
          errorMessage={errors.address}
          disabled={editingData !== undefined}
        />
        <InputFormField
          title="아티클 제목"
          name="title"
          placeholder="아티클 제목을 입력해주세요."
          value={formData.title}
          onChange={(e) => updateFormFieldData("title", e.target.value)}
          errorMessage={errors.title}
          disabled={isButtonClicked}
        />
        <TextareaFormField
          title="아티클 한 줄 요약"
          name="description"
          placeholder="아티클 내용을 요약해주세요."
          value={formData.description}
          onChange={(e) => updateFormFieldData("description", e.target.value)}
          errorMessage={errors.description}
          disabled={isButtonClicked}
          descriptionToken={descriptionToken}
        />
        <SectorFormField
          sector={formData.sector}
          onChange={(subField, subValue) =>
            updateNestedField("sector", subField, subValue)
          }
          errors={{
            sectorValue: errors.sectorValue,
            techStacks: errors.techStacks,
            topics: errors.topics,
          }}
          readOnly={isButtonClicked}
        />
      </S.FormFieldList>
      <S.ArticleButtonGroup>
        <S.ArticleAddButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          disabled={!isFormValid}
        >
          {editingData ? "수정 완료" : "아티클 추가"}
        </S.ArticleAddButton>
        {editingData && (
          <S.ArticleCancelButton type="button" onClick={handleCancel}>
            취소
          </S.ArticleCancelButton>
        )}
      </S.ArticleButtonGroup>
      {loading && <LoadingSpinner />}
    </S.FormBox>
  );
}

export default ArticleForm;
