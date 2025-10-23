import Markdown from "@shared/components/Markdown/Markdown";
import { useState } from "react";
import * as S from "./ProjectOverviewEditor.styled";

interface ProjectOverviewEditorProps {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

function ProjectOverviewEditor({
  value,
  onChange,
  hasError = false,
}: ProjectOverviewEditorProps) {
  const [mode, setMode] = useState<"edit" | "preview">("edit");

  return (
    <S.Container hasError={hasError}>
      <S.TabHeader>
        <S.TabButton
          type="button"
          isActive={mode === "edit"}
          onClick={() => setMode("edit")}
        >
          편집
        </S.TabButton>
        <S.TabButton
          type="button"
          isActive={mode === "preview"}
          onClick={() => setMode("preview")}
        >
          미리보기
        </S.TabButton>
      </S.TabHeader>

      <S.ContentBox>
        {mode === "edit" ? (
          <S.TextArea
            placeholder="프로젝트에 대해 자세히 설명해주세요. 마크다운 문법을 사용할 수 있습니다."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <S.PreviewBox>
            <Markdown text={value} />
          </S.PreviewBox>
        )}
      </S.ContentBox>
    </S.Container>
  );
}

export default ProjectOverviewEditor;
