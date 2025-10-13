import { toast } from "@shared/components/Toast/toast";
import { type RefObject, useCallback, useRef, useState } from "react";
import { fetchAndParseMeta, type Meta } from "../utils/fetchAndParseMeta";

const normalizeUrl = (raw: string) => {
  const url = raw.trim();
  if (!url) return "";
  try {
    const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    new URL(withScheme);
    return withScheme;
  } catch {
    return "";
  }
};

const isAbortError = (e: unknown): e is DOMException =>
  typeof e === "object" && e !== null && "name" in e && e.name === "AbortError";

export const useFetchMeta = () => {
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchByUrl = useCallback(
    async (rawUrl: string): Promise<Meta | null> => {
      const url = normalizeUrl(rawUrl);
      if (!url) {
        toast.warning("올바른 주소(URL)를 입력해주세요.");
        return null;
      }

      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;

      setLoading(true);
      try {
        const { title, description } = await fetchAndParseMeta(url, {
          signal: controller.signal,
        });

        if (!title && !description) {
          toast.info("해당 페이지에 title/description 메타가 없습니다.");
        } else if (!title) {
          toast.warning("title 메타 정보를 가져올 수 없습니다.");
        } else if (!description) {
          toast.warning("description 메타 정보를 가져올 수 없습니다.");
        }

        return { title, description };
      } catch (err: unknown) {
        if (!isAbortError(err)) {
          toast.error("메타 정보를 가져오지 못했습니다.");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fill = useCallback(
    async ({ urlInput }: { urlInput: string }) => {
      const meta = await fetchByUrl(urlInput);
      if (!meta) return;

      if (meta.title && meta.description) {
        return { title: meta.title, description: meta.description };
      }

      return { title: "", description: "" };
    },
    [fetchByUrl]
  );

  const abort = useCallback(() => controllerRef.current?.abort(), []);

  return { loading, fill, abort };
};
