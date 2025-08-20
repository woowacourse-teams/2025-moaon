import setMetaTag from "@shared/utils/setMetaTag";
import { useEffect } from "react";

const DEFAULT_IMAGE_URL =
  "https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/moaon/images/logo.png";
const DEFAULT_KEYWORDS = "프로젝트, 개발자, 탐색, 학습";
const URL = "https://moaon.co.kr/";

type MetaOptions = {
  title: string;
  description?: string;
  imageUrl?: string;
};

export function useMeta({
  title,
  description = "프로젝트를 모아모아, 모아온 📦",
  imageUrl = DEFAULT_IMAGE_URL,
}: MetaOptions) {
  useEffect(() => {
    const setTags = (key: string, content: string) => {
      setMetaTag({ nameOrProperty: key, content });
      setMetaTag({ nameOrProperty: `og:${key}`, content, isProperty: true });
      setMetaTag({ nameOrProperty: `twitter:${key}`, content });
    };

    document.title = title;
    setTags("title", title);

    setTags("description", description);

    setTags("image", imageUrl);

    setMetaTag({
      nameOrProperty: "og:image:alt",
      content: title,
      isProperty: true,
    });
    setMetaTag({ nameOrProperty: "twitter:image:alt", content: title });
    setMetaTag({ nameOrProperty: "keywords", content: DEFAULT_KEYWORDS });
    setMetaTag({
      nameOrProperty: "og:type",
      content: "website",
      isProperty: true,
    });
    setMetaTag({
      nameOrProperty: "twitter:card",
      content: "summary_large_image",
    });

    setMetaTag({ nameOrProperty: "og:url", content: URL, isProperty: true });
    setMetaTag({ nameOrProperty: "twitter:url", content: URL });
  }, [title, description, imageUrl]);
}
