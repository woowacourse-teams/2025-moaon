export const getOptimizedImageUrl = (originalUrl: string, width: number) => {
	if (originalUrl === "") return "";
	if (!Number.isInteger(width) || width <= 0) return originalUrl;

	const filename = originalUrl.split("/").pop() || "";

	const dotIndex = filename.lastIndexOf(".");
	if (dotIndex === -1) return originalUrl;

	const ext = filename.substring(dotIndex).toLowerCase();

	const isOptimizable = [".png", ".jpg", ".jpeg"].includes(ext);
	if (isOptimizable === false) {
		return originalUrl;
	}

	const basename = filename.substring(0, dotIndex);
	const optimizedFile = `${basename}.webp`.replaceAll(" ", "%20");

	const base = process.env.S3_BASE_URL;
	if (base === undefined) return originalUrl;

	return `${base}/variants/${width}/${optimizedFile}`;
};
