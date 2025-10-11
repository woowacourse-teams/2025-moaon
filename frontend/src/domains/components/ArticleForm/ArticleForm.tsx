import {
  ARTICLE_SECTOR_ENTRY,
  type ArticleSectorKey,
} from "@domains/filter/articleSector";
import { BACKEND_TOPICS_ENTRY } from "@domains/filter/articleTopic";
import FilterTrigger from "@shared/components/FilterContainer/FilterTrigger/FilterTrigger";
import { useRef, useState } from "react";
import { getArticleFilterList } from "@/pages/article/ArticleBox/ArticleBoxHeader/utils/getArticleFilterList";
import * as S from "./ArticleForm.styled";
import FormField from "./components/FormField/FormField";
import TagList from "./components/TagList/TagList";
import { useFetchMeta } from "./hooks/useFetchMeta";

function ArticleForm() {
  const addressRef = useRef<HTMLInputElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descRef = useRef<HTMLTextAreaElement | null>(null);
  const [sector, _] = useState<ArticleSectorKey>("nonTech");

  const { fetchAndFill } = useFetchMeta();
  const handleFetchMeta = () => fetchAndFill(addressRef, titleRef, descRef);

  const filterList = getArticleFilterList(sector);
  const sectorEntriesWithoutAll = ARTICLE_SECTOR_ENTRY.filter(
    ([key]) => key !== "all",
  );
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
              ref={addressRef}
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
          <TagList entries={sectorEntriesWithoutAll} />
        </FormField>

        {sector !== "nonTech" && (
          <FormField label="기술스택">
            <FilterTrigger
              label={filterList[1].label}
              param={filterList[1].param}
              onSelect={() => {}}
            >
              {filterList[1].render(() => {})}
            </FilterTrigger>
          </FormField>
        )}
        <FormField label="주제">
          <TagList entries={BACKEND_TOPICS_ENTRY} />
        </FormField>
      </S.FormFieldList>
      <S.ArticleAddButton type="button">+ 아티클 추가</S.ArticleAddButton>
    </S.FormBox>
  );
}

export default ArticleForm;
