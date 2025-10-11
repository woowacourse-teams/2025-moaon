import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import type { AllTopicKey } from "@domains/filter/articleTopic";
import { getTopicsBySector } from "@domains/utils/sectorHandlers";
import FilterTrigger from "@shared/components/FilterContainer/FilterTrigger/FilterTrigger";
import { useRef, useState } from "react";
import TechStackFilterBox from "../TechStackFilterBox/TechStackFilterBox";
import * as S from "./ArticleForm.styled";
import FormField from "./components/FormField/FormField";
import TagList from "./components/TagList/TagList";
import { useFetchMeta } from "./hooks/useFetchMeta";

interface FormDataType {
  address: string;
  title: string;
  description: string;
  sector: ArticleSectorKey;
  topic: AllTopicKey;
  techStack: string;
}

function ArticleForm() {
  const urlRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null!);
  const descRef = useRef<HTMLTextAreaElement>(null!);
  const { fill } = useFetchMeta();
  const handleFetchMeta = () =>
    fill({ urlInput: urlRef.current?.value ?? "", titleRef, descRef });
  const [formData, setFormData] = useState<FormDataType>({
    address: "",
    title: "",
    description: "",
    sector: "all",
    topic: "" as AllTopicKey,
    techStack: "all",
  });
  const updateSectorParams = (data: ArticleSectorKey) => {
    setFormData((prev) => ({ ...prev, sector: data }));
  };
  const updateTopicParams = (data: AllTopicKey) => {
    setFormData((prev) => ({ ...prev, topic: data }));
  };
  const extry = getTopicsBySector(formData.sector);
  const sectorEntriesWithoutAll = ARTICLE_SECTOR_ENTRY.filter(
    ([key]) => key !== "all",
  );
  const isSectorAll = formData.sector === "all";
  const isNonTech = formData.sector === "nonTech";
  return (
    <S.FormBox>
      <S.FormTitle>새 아티클 추가</S.FormTitle>
      <S.FormFieldList>
        <FormField label="아티클 주소">
          <S.ArticleAddressBox>
            <input
              type="text"
              name="address"
              placeholder="https://moaon.co.kr"
              ref={urlRef}
            />
            <S.ArticleAddressButton type="button" onClick={handleFetchMeta}>
              가져오기
            </S.ArticleAddressButton>
          </S.ArticleAddressBox>
        </FormField>
        <FormField label="아티클 제목">
          <input
            type="text"
            name="title"
            placeholder="아티클 제목을 입력해주세요."
            ref={titleRef}
          />
        </FormField>
        <FormField label="아티클 내용">
          <textarea
            name="description"
            placeholder="아티클 내용 요약.."
            ref={descRef}
          ></textarea>
        </FormField>

        <FormField label="직군 선택">
          <TagList<ArticleSectorKey>
            entries={sectorEntriesWithoutAll}
            onSelect={updateSectorParams}
            isActive={(data) => data === formData.sector}
          />
        </FormField>

        {!(isSectorAll || isNonTech) && (
          <FormField label="기술스택">
            <FilterTrigger
              label={"기술 스택"}
              param={"techStacks"}
              onSelect={() => {}}
            >
              <TechStackFilterBox
                onSelect={() => {}}
                sector={formData.sector}
              />
            </FilterTrigger>
          </FormField>
        )}
        {!isSectorAll && (
          <FormField label="주제">
            <TagList<AllTopicKey>
              entries={extry}
              onSelect={updateTopicParams}
              isActive={(data) => data === formData.topic}
            />
          </FormField>
        )}
      </S.FormFieldList>
      <S.ArticleAddButton type="button">+ 아티클 추가</S.ArticleAddButton>
    </S.FormBox>
  );
}

export default ArticleForm;
