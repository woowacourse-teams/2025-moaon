import MarkdownPreview from "@uiw/react-markdown-preview";
import type { ElementType } from "react";
import * as S from "./Markdown.styled";

interface MarkdownProps {
  text: string;
  containerAs?: ElementType;
}

function Markdown({ text, containerAs }: MarkdownProps) {
  return (
    <S.MarkdownWrapper as={containerAs}>
      <MarkdownPreview
        source={text}
        wrapperElement={{
          "data-color-mode": "light",
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "20px",
        }}
      />
    </S.MarkdownWrapper>
  );
}

export default Markdown;
