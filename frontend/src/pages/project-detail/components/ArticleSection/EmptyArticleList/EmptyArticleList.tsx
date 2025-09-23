import EmptyState from "@shared/components/EmptyState/EmptyState";

interface EmptyArticleListProps {
  variant: "searchEmpty" | "initialEmpty";
}

function EmptyArticleList({ variant }: EmptyArticleListProps) {
  if (variant === "searchEmpty") {
    return (
      <EmptyState
        title="검색된 아티클이 없어요."
        description="검색어를 바꿔 다시 시도해 보세요."
      />
    );
  }

  return (
    <EmptyState title="프로젝트에 등록된 아티클이 없어요." description="" />
  );
}

export default EmptyArticleList;
