type ImageExtensions = "png" | "jpg" | "jpeg" | "svg" | "gif" | "webp";
type VideoExtensions = "mp4" | "mov" | "avi" | "mkv" | "webm";
type AudioExtensions = "mp3" | "wav" | "flac" | "aac";
type DocsExtensions =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "ppt"
  | "pptx"
  | "txt";

interface FileCategories {
  image: ImageExtensions;
  video: VideoExtensions;
  audio: AudioExtensions;
  docs: DocsExtensions;
}

export type FileExtension = FileCategories[keyof FileCategories];
