import type { PropsWithChildren } from "react";
import * as S from "./ArticleDraftList.styled";

function ArticleDraftList({ children }: PropsWithChildren) {
  return <S.ArticleDraftList>{children}</S.ArticleDraftList>;
}

export default ArticleDraftList;
