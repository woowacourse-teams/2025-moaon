export const parseMetaFromHtml = (html: string) => {
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

  return {
    title: ogTitle || titleTag || "",
    description: ogDesc || metaDesc || "",
  };
};

const ensureUrl = (raw: string) => {
  if (/^https?:\/\//i.test(raw)) return raw;
  return `https://${raw}`;
};

export async function fetchMeta(urlOrRaw: string) {
  const url = ensureUrl(urlOrRaw);
  const res = await fetch(url, { method: "GET", mode: "cors" });
  if (!res.ok) {
    throw new Error(`status:${res.status}`);
  }
  const html = await res.text();
  return parseMetaFromHtml(html);
}
