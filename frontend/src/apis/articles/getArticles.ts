import { httpClient } from "../HttpClient";
import type { ArticleListResponse } from "./articles.type";

const ARTICLE_PAGE_SIZE = 20;

const getArticles = async (cursor: string): Promise<ArticleListResponse> => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("limit", ARTICLE_PAGE_SIZE.toString());
  if (cursor) {
    searchParams.set("cursor", cursor);
  }
  const articles = await httpClient.get(`/articles?${searchParams.toString()}`);
  if (!articles.ok) {
    throw new Error("Failed to fetch articles");
  }

  return articles.json();
};

export default getArticles;
