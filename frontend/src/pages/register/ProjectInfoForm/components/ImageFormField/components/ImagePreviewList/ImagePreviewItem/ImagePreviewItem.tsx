import CloseButtonIcon from "@shared/components/CloseButtonIcon/CloseButtonIcon";
import * as S from "./ImagePreviewItem.styled";

interface ImagePreviewItemProps {
  file: File;
  previewUrl: string;
  isThumbnail: boolean;
  onRemove: (file: File) => void;
}

function ImagePreviewItem({
  file,
  previewUrl,
  isThumbnail,
  onRemove,
}: ImagePreviewItemProps) {
  const { name, size } = file;

  return (
    <S.PreviewItem isThumbnail={isThumbnail}>
      {isThumbnail && <S.PreviewBadge>대표</S.PreviewBadge>}
      <S.PreviewImage src={previewUrl} alt={name} />
      <S.PreviewInfo>
        <S.FileName>{name}</S.FileName>
        <S.FileSize>{(size / 1024).toFixed(1)} KB</S.FileSize>
      </S.PreviewInfo>
      <S.RemoveButtonBox onClick={() => onRemove(file)}>
        <CloseButtonIcon color={"#fff"} />
      </S.RemoveButtonBox>
    </S.PreviewItem>
  );
}

export default ImagePreviewItem;
