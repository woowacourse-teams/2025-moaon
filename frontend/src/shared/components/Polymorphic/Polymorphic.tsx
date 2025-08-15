import type { ComponentProps, ElementType } from "react";

type PolymorphicProps<T extends ElementType> = {
  as?: T;
} & ComponentProps<T>;

function Polymorphic<T extends ElementType = "div">({
  as = "div",
  ...props
}: PolymorphicProps<T>) {
  const Element = as;
  return <Element {...props} />;
}

export default Polymorphic;
