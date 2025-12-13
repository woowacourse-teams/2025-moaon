export const getOptimizedImageUrl = (originalUrl: string, width: number) => {
  if (!originalUrl) return "";

  const base = process.env.S3_BASE_URL;
  const filename = originalUrl.split("/").pop() || "";

  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1) return originalUrl;

  const ext = filename.substring(dotIndex).toLowerCase();
  const basename = filename.substring(0, dotIndex);

  const isOptimizable = [".png", ".jpg", ".jpeg"].includes(ext);
  if (!isOptimizable) {
    return originalUrl;
  }

  const optimizedFile = `${basename}.webp`;

  return `${base}/variants/${width}/${optimizedFile}`;
};
