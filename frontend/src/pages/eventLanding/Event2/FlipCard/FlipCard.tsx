import { useState } from "react";
import type { ProjectCard } from "@/apis/projects/projects.type";
import * as S from "./FlipCard.styled";

interface FlipCardProps {
  data: ProjectCard;
  position: "fe" | "be";
}

export default function FlipCard({ data, position }: FlipCardProps) {
  const { id, title, summary, thumbnailUrl } = data;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <S.Trigger
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      to={`/project/${id}`}
    >
      <S.Card isFlipped={isFlipped}>
        <S.FrontSide>
          <S.Image src={thumbnailUrl} alt="" />
        </S.FrontSide>

        <S.BackSide position={position}>
          <S.Title>{title}</S.Title>
          <S.Description>{summary}</S.Description>
        </S.BackSide>
      </S.Card>
    </S.Trigger>
  );
}
