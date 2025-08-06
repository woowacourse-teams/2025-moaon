import { TECH_STACK_ENTRY } from "@domains/filter/techStack";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";
import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

function TagList() {
  const tagParams = useSearchParams({ key: "techStacks", mode: "multi" }); // TODO: 쿼리파라미터를 "tag"로 변경하는것이 유지보수에 적절함
  const selectedTags = tagParams.get();
  const { refetch } = useArticleList();

  const handleTagSelect = (value: string) => {
    tagParams.update(value);
    refetch();
  };

  return (
    <S.TagListContainer>
      <S.TagListTitle>태그</S.TagListTitle>
      <S.TagList>
        {TECH_STACK_ENTRY.map(([key, { label }]) => {
          const isSelected = selectedTags.includes(key);

          return (
            <Tag
              onSelect={() => handleTagSelect(key)}
              key={label}
              isSelected={isSelected}
            >
              {label}
            </Tag>
          );
        })}
      </S.TagList>
    </S.TagListContainer>
  );
}

export default TagList;
