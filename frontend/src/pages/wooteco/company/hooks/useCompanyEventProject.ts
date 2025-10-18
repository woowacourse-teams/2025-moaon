import useSearchParams from "@shared/hooks/useSearchParams";
import type { ProjectCard } from "@/apis/projects/projects.type";
import { 우테코기수 } from "../../constants/projectId";

export const useCompanyEventProject = (projects: ProjectCard[]) => {
  const params = useSearchParams({
    key: "ordinals",
    mode: "multi",
  });
  const selectedOrdinals = params
    .get()
    .flatMap((ordinal) => 우테코기수[ordinal]);

  const filteredByOrdinals = selectedOrdinals.length
    ? projects.filter((project) => selectedOrdinals.includes(project.id))
    : projects;

  return filteredByOrdinals;
};
