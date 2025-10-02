import remarkGfm from "remark-gfm";
import * as S from "./markdown.styled";

interface MarkdownProps {
  text: string;
}

function Markdown({ text }: MarkdownProps) {
  return <S.Markdown remarkPlugins={[remarkGfm]}>{text}</S.Markdown>;
}

export default Markdown;
