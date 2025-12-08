import setMetaTags from "@shared/utils/setMetaTags";
import { useEffect } from "react";

const DEFAULT_IMAGE_URL = `${process.env.S3_BASE_URL}/images/logo.png`;
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
    document.title = title;

    const createTag = (
      keyType: "name" | "property",
      keyName: string,
      content: string
    ) => ({
      attr: { key: keyType, value: keyName },
      content,
    });

    const metaConfigs = [
      createTag("name", "title", title),
      createTag("name", "description", description),
      createTag("name", "image", imageUrl),
      createTag("name", "keywords", DEFAULT_KEYWORDS),

      createTag("property", "og:title", title),
      createTag("property", "og:description", description),
      createTag("property", "og:image", imageUrl),
      createTag("property", "og:image:alt", title),
      createTag("property", "og:type", "website"),
      createTag("property", "og:url", URL),

      createTag("name", "twitter:title", title),
      createTag("name", "twitter:description", description),
      createTag("name", "twitter:image", imageUrl),
      createTag("name", "twitter:image:alt", title),
      createTag("name", "twitter:card", "summary_large_image"),
      createTag("name", "twitter:url", URL),
    ];

    setMetaTags(metaConfigs);
  }, [title, description, imageUrl]);
}
