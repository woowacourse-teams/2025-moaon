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
    updateFormFieldData,
    updateNestedField,
    handleFetchMeta,
    handleSubmit,
    handleCancel,
  } = useArticleForm({
    editingData,
    onSubmit,
    onUpdate,
    onCancel,
  });

  return (
    <S.FormBox>
      <S.FormTitle>
        {editingData ? "아티클 수정" : "새 아티클 추가"}
      </S.FormTitle>
      <S.FormFieldList>
        <InputFormFieldWithButton
          title="아티클 주소"
          name="address"
          placeholder="https://moaon.co.kr"
          type="url"
          value={formData.address}
          onChange={(e) => updateFormFieldData("address", e.target.value)}
          buttonEvent={handleFetchMeta}
        />
        <InputFormField
          title="아티클 제목"
          name="title"
          placeholder="아티클 제목을 입력해주세요."
          value={formData.title}
          onChange={(e) => updateFormFieldData("title", e.target.value)}
        />
        <TextareaFormField
          title="아티클 내용"
          name="description"
          placeholder="아티클 내용 요약.."
          value={formData.description}
          onChange={(e) => updateFormFieldData("description", e.target.value)}
        />
        <SectorFormField
          sector={formData.sector}
          onChange={(subField, subValue) =>
            updateNestedField("sector", subField, subValue)
          }
        />
      </S.FormFieldList>
      <S.ArticleButtonGroup>
        <S.ArticleAddButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {editingData ? "아티클 수정" : "+ 아티클 추가"}
        </S.ArticleAddButton>
        {editingData && (
          <S.ArticleCancelButton type="button" onClick={handleCancel}>
            취소
          </S.ArticleCancelButton>
        )}
      </S.ArticleButtonGroup>
    </S.FormBox>
  );
}

export default ArticleForm;
