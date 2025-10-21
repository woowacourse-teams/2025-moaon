export function getCookieValue(name: string): string {
  if (typeof document === "undefined") return "";

  const pairs = document.cookie ? document.cookie.split("; ") : [];
  for (const pair of pairs) {
    const [rawKey, ...rawValParts] = pair.split("=");
    const key = decodeURIComponent(rawKey);
    if (key === name) {
      const rawVal = rawValParts.join("=");
      try {
        return decodeURIComponent(rawVal);
      } catch {
        return rawVal;
      }
    }
  }
  return "";
}
