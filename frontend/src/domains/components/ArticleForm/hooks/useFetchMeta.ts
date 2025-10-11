import { toast } from "@shared/components/Toast/toast";
import { fetchMeta } from "../utils/parseMetaFromHtml";

export const useFetchMeta = () => {
  const fetchAndFill = async (
    addressRef: React.RefObject<HTMLInputElement | null>,
    titleRef: React.RefObject<HTMLInputElement | null>,
    descRef: React.RefObject<HTMLTextAreaElement | null>
  ) => {
    const raw = addressRef.current?.value?.trim();
    if (!raw) {
      toast.warning("주소를 입력해주세요.");
      return;
    }

    try {
      const { title, description } = await fetchMeta(raw);

      if (title && titleRef.current) titleRef.current.value = title;
      if (description && descRef.current) descRef.current.value = description;

      if (!title && !description) {
        toast.info("해당 페이지에 메타(title/description)가 없습니다.");
      } else if (!title) {
        toast.warning("해당 페이지에 title 메타 정보를 가져올 수 없습니다.");
      } else if (!description) {
        toast.warning(
          "해당 페이지에 description 메타 정보를 가져올 수 없습니다."
        );
      } else {
        toast.success("메타 정보를 가져왔습니다.");
      }
    } catch (err) {
      console.error("fetchMeta error:", err);
      toast.error("메타 정보를 가져오지 못했습니다.");
    }
  };

  return { fetchAndFill };
};
