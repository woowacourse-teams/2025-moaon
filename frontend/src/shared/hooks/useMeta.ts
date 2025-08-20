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
    const setTags = (metaName: string, content: string) => {
      setMetaTag({ attr: { key: "name", value: metaName }, content });
      setMetaTag({
        attr: { key: "property", value: `og:${metaName}` },
        content,
      });
      setMetaTag({
        attr: { key: "name", value: `twitter:${metaName}` },
        content,
      });
    };

    document.title = title;
    setTags("title", title);
    setTags("description", description);
    setTags("image", imageUrl);

    setMetaTag({
      attr: { key: "property", value: "og:image:alt" },
      content: title,
    });
    setMetaTag({
      attr: { key: "name", value: "twitter:image:alt" },
      content: title,
    });
    setMetaTag({
      attr: { key: "name", value: "keywords" },
      content: DEFAULT_KEYWORDS,
    });
    setMetaTag({
      attr: { key: "property", value: "og:type" },
      content: "website",
    });
    setMetaTag({
      attr: { key: "name", value: "twitter:card" },
      content: "summary_large_image",
    });

    setMetaTag({ attr: { key: "property", value: "og:url" }, content: URL });
    setMetaTag({ attr: { key: "name", value: "twitter:url" }, content: URL });
  }, [title, description, imageUrl]);
}
