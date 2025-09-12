import type { ArticleCategoryKey } from "@domains/filter/articleCategory";
import {
  ANDROID_STACK_ENTRY,
  BACKEND_STACK_ENTRY,
  FRONTEND_STACK_ENTRY,
  IOS_STACK_ENTRY,
  TECH_STACK_ENTRY,
  type TechStackKey,
} from "@domains/filter/techStack";
import CloseIcon from "@shared/components/CloseIcon/CloseIcon";
import useSearchParams from "@shared/hooks/useSearchParams";
import useArticleList from "../hooks/useArticleList";
import Tag from "./Tag/Tag";
import * as S from "./TagList.styled";

interface TagListProps {
  selectedCategory: ArticleCategoryKey;
}

function TagList({ selectedCategory }: TagListProps) {
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

  const getTagEntries = () => {
    switch (selectedCategory) {
      case "all":
        return TECH_STACK_ENTRY;
      case "fe":
        return FRONTEND_STACK_ENTRY;
      case "be":
        return BACKEND_STACK_ENTRY;
      case "android":
        return ANDROID_STACK_ENTRY;
      case "ios":
        return IOS_STACK_ENTRY;
      case "infra":
      case "nonTech":
        return [];
      default:
        return TECH_STACK_ENTRY;
    }
  };

  const tagEntries = getTagEntries();

  if (selectedCategory === "infra" || selectedCategory === "nonTech") {
    return null;
  }

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
        {tagEntries.map(([key, { label }]) => {
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
