import { Fragment, type ReactElement, type ReactNode } from "react";

interface SeparatedProps {
  by: ReactNode;
  children: ReactElement[];
}

export function Separated({ children, by: separator }: SeparatedProps) {
  return (
    <>
      {children.map((child, index, { length }) => {
        const isLastChild = index === length - 1;
        return (
          <Fragment key={child.key}>
            {child}
            {!isLastChild && separator}
          </Fragment>
        );
      })}
    </>
  );
}
