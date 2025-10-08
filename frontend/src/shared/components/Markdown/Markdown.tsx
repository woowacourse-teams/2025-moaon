import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as S from "./Markdown.styled";

interface MarkdownProps {
  text: string;
}

function Markdown({ text }: MarkdownProps) {
  return (
    <S.MarkdownWrapper>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </S.MarkdownWrapper>
  );
}

export default Markdown;
