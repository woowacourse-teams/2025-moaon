import type { ComponentProps } from "react";
import * as S from "./DeleteButtonIcon.styled";

interface DeleteButtonIconProps extends ComponentProps<"button"> {
  iconSize?: number;
}

function DeleteButtonIcon({ iconSize = 24, ...props }: DeleteButtonIconProps) {
  return (
    <S.CloseButton type="button" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        aria-label="닫기"
        role="img"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M14 11V17M10 11V17M6 7V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7M4 7H20M7 7L9 3H15L17 7"
          stroke="#54575F"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </S.CloseButton>
  );
}

export default DeleteButtonIcon;
