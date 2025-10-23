import MarkdownPreview from "@uiw/react-markdown-preview";
import type { ElementType } from "react";
import * as S from "./Markdown.styled";

const replaceAsteriskWithHyphen = (text: string) => {
  return text.replaceAll("\n* ", "- ");
};

const removeTrailingSpaces = (text: string) => {
  return text.replace(/[ \t]+$/gm, "");
};

const parseBoldWithQuotes = (text: string) => {
  const pattern =
    /\*\*(?:([\u0027\u0060\u0022\u2018\u201C])(.+?)([\u0027\u0060\u0022\u2019\u201D])|(.+?))\*\*/g;

  return text.replace(
    pattern,
    (_, openQuote, contentWithQuotes, closeQuote, contentNoQuotes) => {
      if (contentNoQuotes !== undefined) {
        return `<strong>${contentNoQuotes}</strong>`;
      }
      return `<strong>${openQuote}${contentWithQuotes}${closeQuote}</strong>`;
    },
  );
};

interface MarkdownProps {
  text: string;
  containerAs?: ElementType;
}

function Markdown({ text, containerAs }: MarkdownProps) {
  return (
    <S.MarkdownWrapper as={containerAs}>
      <MarkdownPreview
        source={parseBoldWithQuotes(
          removeTrailingSpaces(replaceAsteriskWithHyphen(text)),
        )}
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
