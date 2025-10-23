import { httpClient } from "../HttpClient";
import type { crawlArticleData } from "./getCrawlArticle.type";

const getCrawlArticle = async (url: string): Promise<crawlArticleData> => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("url", url);
  const crawlArticle = await httpClient.get(
    `/crawl?${searchParams.toString()}`
  );

  if (!crawlArticle.ok) {
    const { message: errorMessage } = await crawlArticle.json();

    throw new Error(
      errorMessage ||
        "메타데이터를 가져오는데 실패했어요. 주소를 다시 확인해주세요."
    );
  }

  return crawlArticle.json();
};

export default getCrawlArticle;
