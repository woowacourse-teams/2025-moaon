import styled from "@emotion/styled";

export const PreviewItem = styled.li<{ isThumbnail: boolean }>`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ isThumbnail }) =>
    isThumbnail
      ? "rgba(58, 103, 215, 0.2) 0px 7px 29px 0px"
      : "0 2px 4px rgba(0, 0, 0, 0.1)"};
`;

export const PreviewBadge = styled.b`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #007bff;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 4px;
  z-index: 1;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 7.5rem;
  object-fit: cover;
  display: block;
`;

export const PreviewInfo = styled.div`
  padding: 0.5rem;
  background: #f8f8f8;
`;

export const FileName = styled.p`
  margin: 0;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileSize = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.6875rem;
  color: #666;
`;

export const RemoveButtonBox = styled.div`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  width: 1.5rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;
