import { CATEGORY_ENTRY } from "@domains/filter/category";
import CategoryFilterButton from "./CategoryFilterButton/CategoryFilterButton";
import * as S from "./CategoryFilterList.styled";

function CategoryFilterList() {
  return (
    <S.List>
      {CATEGORY_ENTRY.map(([key, { label }]) => (
        <CategoryFilterButton key={key} label={label} value={key} />
      ))}
    </S.List>
  );
}

export default CategoryFilterList;
