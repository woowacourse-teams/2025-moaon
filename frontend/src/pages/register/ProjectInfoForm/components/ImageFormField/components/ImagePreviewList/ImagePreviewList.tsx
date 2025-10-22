import type { PropsWithChildren } from "react";
import * as S from "./ImagePreviewList.styled";

function ImagePreviewList({ children }: PropsWithChildren) {
  return <S.PreviewList>{children}</S.PreviewList>;
}

export default ImagePreviewList;
