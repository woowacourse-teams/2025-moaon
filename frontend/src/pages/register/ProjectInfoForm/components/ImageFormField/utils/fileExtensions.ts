const normalizeExtensions = (extensions?: string[]) => {
  if (!extensions?.length) return [];
  return extensions.map((ext) =>
    (ext.startsWith(".") ? ext.slice(1) : ext).toLowerCase()
  );
};

const buildAcceptString = (extensions?: string[]) => {
  if (!extensions?.length) return undefined;
  return extensions
    .map((ext) => (ext.startsWith(".") ? ext : `.${ext}`))
    .join(",");
};

export const isAllowedExtension = (fileName: string, allowed: string[]) => {
  if (!allowed.length) return true;
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return allowed.includes(ext);
};

export const prepareExtensions = (extensions?: string[]) => {
  const normalized = normalizeExtensions(extensions);
  const accept = buildAcceptString(extensions);
  return { normalized, accept } as const;
};
