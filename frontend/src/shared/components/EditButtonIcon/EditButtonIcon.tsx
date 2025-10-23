import type { ComponentProps } from "react";
import * as S from "./EditButtonIcon.styled";

interface EditButtonIconProps extends ComponentProps<"button"> {
  iconSize?: number;
}

function EditButtonIcon({ iconSize = 24, ...props }: EditButtonIconProps) {
  return (
    <S.CloseButton type="button" {...props}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        aria-label="닫기"
        role="img"
      >
        <path
          d="M20.0651 7.39423L7.09967 20.4114C6.72438 20.7882 6.21446 21 5.68265 21H4.00383C3.44943 21 3 20.5466 3 19.9922V18.2987C3 17.7696 3.20962 17.2621 3.58297 16.8873L16.5517 3.86681C19.5632 1.34721 22.5747 4.87462 20.0651 7.39423Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M15.3097 5.30981L18.7274 8.72755"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </S.CloseButton>
  );
}

export default EditButtonIcon;
