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
import { toast } from "@shared/components/Toast/toast";
import { useEffect, useRef, useState } from "react";
import * as S from "./ArticleForm.styled";
import FormField from "./components/FormField/FormField";
import TagList from "./components/TagList/TagList";
import { useFetchMeta } from "./hooks/useFetchMeta";

export interface FormDataType {
  id: string;
  address: string;
  title: string;
  description: string;
  sector: ArticleSectorKey;
  topic: AllTopicKey[];
  techStack: TechStackKey[];
}

function ArticleForm({
  onFormSubmit,
  initialData,
  onUpdate,
  onCancel,
}: {
  onFormSubmit: (data: FormDataType) => void;
  initialData?: FormDataType;
  onUpdate?: (data: FormDataType) => void;
  onCancel?: () => void;
}) {
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null!);
  const descRef = useRef<HTMLTextAreaElement>(null!);
  const { fill } = useFetchMeta();
  const handleFetchMeta = async () => {
    await fill({ urlInput: urlRef.current?.value ?? "", titleRef, descRef });
    setFormData((prev) => ({
      ...prev,
      title: titleRef.current?.value,
      description: descRef.current?.value,
    }));
  };
  const [formData, setFormData] = useState<FormDataType>({
    id: crypto.randomUUID(),
    address: "",
    title: "",
    description: "",
    sector: "all",
    topic: [],
    techStack: [],
  });
  // initialData가 바뀌면 폼에 반영, initialData가 없으면 폼 초기화
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (urlRef.current) urlRef.current.value = initialData.address ?? "";
      if (titleRef.current) titleRef.current.value = initialData.title ?? "";
      if (descRef.current)
        descRef.current.value = initialData.description ?? "";
    } else {
      // 수정 모드가 해제되면 폼 초기화
      setFormData({
        id: crypto.randomUUID(),
        address: "",
        title: "",
        description: "",
        sector: "all",
        topic: [],
        techStack: [],
      });
      if (urlRef.current) urlRef.current.value = "";
      if (titleRef.current) titleRef.current.value = "";
      if (descRef.current) descRef.current.value = "";
    }
  }, [initialData]);
  const updateSectorParams = (data: ArticleSectorKey) => {
    setFormData((prev) => ({
      ...prev,
      sector: data,
      topic: [],
      techStack: [],
    }));
  };
  const updateTopicParams = (data: AllTopicKey) => {
    setFormData((prev) => {
      const isInclude = prev.topic.includes(data);
      if (isInclude) {
        return {
          ...prev,
          topic: prev.topic.filter((topic) => topic !== data),
        };
      }
      return {
        ...prev,
        topic: [...prev.topic, data],
      };
    });
  };
  const updateTechStackParams = (data: TechStackKey) => {
    setFormData((prev) => {
      const isInclude = prev.techStack.includes(data);
      if (isInclude) {
        return {
          ...prev,
          techStack: prev.techStack.filter((techStack) => techStack !== data),
        };
      }
      return {
        ...prev,
        techStack: [...prev.techStack, data],
      };
    });
  };
  const validateFormData = () => {
    if (!formData.address) {
      toast.warning("아티클 주소를 입력해주세요.");
      return false;
    }

    if (!formData.title) {
      toast.warning("아티클 제목을 입력해주세요.");
      return false;
    }
    if (!formData.description) {
      toast.warning("아티클 내용을 입력해주세요.");
      return false;
    }
    if (formData.sector === "all") {
      toast.warning("직군을 선택해주세요.");
      return false;
    }
    if (formData.sector !== "nonTech" && formData.techStack.length === 0) {
      toast.warning("기술스택을 하나 이상 선택해주세요.");
      return false;
    }
    if (formData.topic.length === 0) {
      toast.warning("주제를 하나 이상 선택해주세요.");
      return false;
    }
    // 수정 모드이면 onUpdate 호출, 아니면 새로 추가
    if (onUpdate && initialData) {
      onUpdate(formData);
      return true;
    }
    onFormSubmit(formData);
    // 추가 후 초기화
    setFormData({
      id: crypto.randomUUID(),
      address: "",
      title: "",
      description: "",
      sector: "all",
      topic: [],
      techStack: [],
    });
    if (urlRef.current) urlRef.current.value = "";
    if (titleRef.current) titleRef.current.value = "";
    if (descRef.current) descRef.current.value = "";
    return true;
  };
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
        {initialData ? "아티클 수정" : "새 아티클 추가"}
      </S.FormTitle>
      <S.FormFieldList>
        <FormField title="아티클 주소">
          <S.ArticleAddressBox>
            <input
              type="text"
              name="address"
              placeholder="https://moaon.co.kr"
              ref={urlRef}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
            <S.ArticleAddressButton type="button" onClick={handleFetchMeta}>
              가져오기
            </S.ArticleAddressButton>
          </S.ArticleAddressBox>
        </FormField>
        <FormField title="아티클 제목">
          <input
            type="text"
            name="title"
            placeholder="아티클 제목을 입력해주세요."
            ref={titleRef}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </FormField>
        <FormField title="아티클 내용">
          <textarea
            name="description"
            placeholder="아티클 내용 요약.."
            ref={descRef}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
        </FormField>
        <FormField title="직군 선택">
          <TagList<ArticleSectorKey>
            entries={sectorEntriesWithoutAll}
            onSelect={updateSectorParams}
            isActive={(data) => data === formData.sector}
          />
        </FormField>
        {!(isSectorAll || isNonTech) && (
          <FormField title="기술스택">
            <TagList<TechStackKey>
              entries={techStackEntry}
              onSelect={updateTechStackParams}
              isActive={(data) => formData.techStack.includes(data)}
            />
          </FormField>
        )}
        {!isSectorAll && (
          <FormField title="주제">
            <TagList<AllTopicKey>
              entries={topicEntry}
              onSelect={updateTopicParams}
              isActive={(data) => formData.topic.includes(data)}
            />
          </FormField>
        )}
      </S.FormFieldList>
      <div style={{ display: "flex", gap: "1rem" }}>
        <S.ArticleAddButton type="button" onClick={validateFormData}>
          {initialData ? "수정 완료" : "+ 아티클 추가"}
        </S.ArticleAddButton>
        {initialData && onCancel && (
          <S.ArticleCancelButton type="button" onClick={onCancel}>
            취소
          </S.ArticleCancelButton>
        )}
      </div>
    </S.FormBox>
  );
}

export default ArticleForm;
