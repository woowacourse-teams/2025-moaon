export interface Meta {
  title?: string;
  description?: string;
}

export type FetchMetaOptions = {
  signal?: AbortSignal;
};

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

  const decodeHtml = (s?: string | null) =>
    s
      ? new DOMParser().parseFromString(s, "text/html").body.textContent || ""
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
