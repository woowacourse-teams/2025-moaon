import type { ElementType, HTMLAttributes, PropsWithChildren } from "react";
import * as S from "./VisuallyHidden.styled";

interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

function VisuallyHidden({
  as,
  children,
  ...props
}: PropsWithChildren<VisuallyHiddenProps>) {
  return (
    <S.Container {...props} as={as}>
      {children}
    </S.Container>
  );
}

export default VisuallyHidden;
