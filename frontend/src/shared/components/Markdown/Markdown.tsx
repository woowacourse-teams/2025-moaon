import type { ElementType } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "./Markdown.styled";

interface MarkdownProps {
  text: string;
  containerAs?: ElementType;
}

function Markdown({ text, containerAs }: MarkdownProps) {
  return (
    <S.MarkdownWrapper as={containerAs}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </S.MarkdownWrapper>
  );
}
export default Markdown;
