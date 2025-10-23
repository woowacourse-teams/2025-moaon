import type { ComponentProps } from "react";
import * as S from "./EditButtonIcon.styled";

interface EditButtonIconProps extends ComponentProps<"button"> {
  iconSize?: number;
}

function EditButtonIcon({ iconSize = 24, ...props }: EditButtonIconProps) {
  return (
    <S.CloseButton type="button" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="닫기"
        role="img"
      >
        <path
          d="M14.44 5.78006L4.19796 16.0201C3.89343 16.3245 3.69528 16.719 3.63296 17.1451L3.07996 20.9191L6.85496 20.3661C7.28112 20.3035 7.67569 20.1049 7.97996 19.8001L18.22 9.56006M14.44 5.78006L16.669 3.55006C16.8175 3.40144 16.9939 3.28356 17.1881 3.20313C17.3822 3.1227 17.5903 3.0813 17.8005 3.0813C18.0106 3.0813 18.2187 3.1227 18.4128 3.20313C18.607 3.28356 18.7834 3.40144 18.932 3.55006L20.45 5.06806C20.5986 5.21664 20.7165 5.39303 20.7969 5.58718C20.8773 5.78132 20.9187 5.98941 20.9187 6.19956C20.9187 6.4097 20.8773 6.61779 20.7969 6.81193C20.7165 7.00608 20.5986 7.18248 20.45 7.33106L18.22 9.56006M14.44 5.78006L18.22 9.56006"
          stroke="#54575F"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </S.CloseButton>
  );
}

export default EditButtonIcon;
