import { TECH_STACK_ENTRY, type TechStackKey } from "@domains/filter/techStack";
import CloseIcon from "@shared/components/CloseIcon/CloseIcon";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";
import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

function TagList() {
  const tagParams = useSearchParams({ key: "techStacks", mode: "multi" });
  const selectedTags = tagParams.get();
  const { refetch } = useArticleList();

  const handleTagSelect = (value: TechStackKey) => {
    tagParams.update(value, { replace: true });
    refetch();
  };

  const handleClearTags = () => {
    tagParams.deleteAll({ replace: true });
    refetch();
  };
  return (
    <S.TagListContainer>
      <S.TagListHeader>
        <S.TagListTitle>태그</S.TagListTitle>
        {selectedTags.length > 0 && (
          <S.ResetButton type="button" onClick={handleClearTags}>
            <CloseIcon size={10} />
          </S.ResetButton>
        )}
      </S.TagListHeader>
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
