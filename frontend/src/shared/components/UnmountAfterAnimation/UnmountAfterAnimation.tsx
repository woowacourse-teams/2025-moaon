import {
  type ComponentProps,
  type ElementType,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Polymorphic from "../Polymorphic/Polymorphic";

type UnmountAfterAnimationProps<T extends ElementType = "div"> = {
  visible: boolean;
  onExit?: () => void;
  as?: T;
} & ComponentProps<T>;

function UnmountAfterAnimation<T extends ElementType = "div">({
  visible,
  onExit,
  children,
  as = "div",
  ...props
}: PropsWithChildren<UnmountAfterAnimationProps<T>>) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  const refCallback = (element: HTMLElement | null) => {
    if (!element || visible) {
      return;
    }

    const handleAnimationEnd = () => {
      onExit?.();
      setMounted(false);
    };

    const animations = element.getAnimations({ subtree: true });
    Promise.all(animations.map((animation) => animation.finished))
      .then(() => handleAnimationEnd())
      .catch(() => handleAnimationEnd());
  };

  if (!mounted) {
    return null;
  }

  return (
    <Polymorphic as={as} ref={refCallback} {...props}>
      {children}
    </Polymorphic>
  );
}

export default UnmountAfterAnimation;
