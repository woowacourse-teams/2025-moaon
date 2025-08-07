import type React from "react";
import * as S from "./CardList.styled";

interface CardListProps {
  children: React.ReactNode[];
}

function CardList({ children }: CardListProps) {
  return <S.CardListContainer>{children}</S.CardListContainer>;
}

export default CardList;
