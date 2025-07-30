import useSearchParams from "@shared/hooks/useSearchParams";

export const useFilterParams = () => {
  const techStacks = useSearchParams({ key: "techStacks", mode: "multi" });
  const platforms = useSearchParams({ key: "platforms", mode: "multi" });
  const categories = useSearchParams({ key: "categories", mode: "multi" });

  const deleteFilter = (key: string, value: string) => {
    switch (key) {
      case "techStacks":
        techStacks.update(value);
        break;
      case "platforms":
        platforms.update(value);
        break;
      case "categories":
        categories.update(value);
        break;
      default:
        throw new Error(`Unknown filter key: ${key}`);
    }
  };

  return { deleteFilter };
};
