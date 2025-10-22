import type { uploadProjectImageResponse } from "./postProjectRegister.type";

const postProjectImage = async ({
  response,
  files,
}: uploadProjectImageResponse) => {
  const keys = await Promise.all(
    response.map(async ({ preSignedUrl, key }, index) => {
      const file = files[index];
      const res = await fetch(preSignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`파일 업로드에 실패했습니다`);
      }

      return `https://techcourse-project-2025.s3.ap-northeast-2.amazonaws.com/${key}`;
    })
  );

  return keys;
};

export default postProjectImage;
