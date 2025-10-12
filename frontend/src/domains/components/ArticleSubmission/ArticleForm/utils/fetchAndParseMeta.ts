export interface Meta {
  title?: string;
  description?: string;
}

export type FetchMetaOptions = {
  signal?: AbortSignal;
};

const normalizeUrl = (rawUrl: string) => {
  const trimmedUrl = rawUrl.trim();
  if (!trimmedUrl) return "";
  try {
    const urlWithScheme = /^https?:\/\//i.test(trimmedUrl)
      ? trimmedUrl
      : `https://${trimmedUrl}`;
    new URL(urlWithScheme);
    return urlWithScheme;
  } catch {
    return "";
  }
};

const extractMetaFromHtml = (html: string): Meta => {
  const doc = new DOMParser().parseFromString(html, "text/html");

  const ogTitle = doc
    .querySelector('meta[property="og:title"]')
    ?.getAttribute("content")
    ?.trim();

  const titleTag = doc.querySelector("title")?.textContent?.trim();

  const ogDesc = doc
    .querySelector('meta[property="og:description"]')
    ?.getAttribute("content")
    ?.trim();

  const metaDesc = doc
    .querySelector('meta[name="description"]')
    ?.getAttribute("content")
    ?.trim();

  const decodeHtml = (encodedString?: string | null) =>
    encodedString
      ? new DOMParser().parseFromString(encodedString, "text/html").body
          .textContent || ""
      : "";

  return {
    title: decodeHtml(ogTitle || titleTag || ""),
    description: decodeHtml(ogDesc || metaDesc || ""),
  };
};

export async function fetchAndParseMeta(
  rawUrl: string,
  opts?: FetchMetaOptions
): Promise<Meta> {
  const url = normalizeUrl(rawUrl);
  if (!url) throw new Error("Invalid URL");

  const res = await fetch(url, {
    method: "GET",
    mode: "cors",
    signal: opts?.signal,
  });

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  const html = await res.text();
  return extractMetaFromHtml(html);
}
