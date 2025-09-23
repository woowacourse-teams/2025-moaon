import {
  type ElementType,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Polymorphic from "../Polymorphic/Polymorphic";

interface UnmountAfterAnimationProps<T extends ElementType = "div"> {
  visible: boolean;
  as?: T;
}

function UnmountAfterAnimation({
  visible,
  children,
  as = "div",
}: PropsWithChildren<UnmountAfterAnimationProps>) {
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

    const animations = element.getAnimations({ subtree: true });

    Promise.all(animations.map((animation) => animation.finished))
      .then(() => setMounted(false))
      .catch(() => setMounted(false));
  };

  if (!mounted) {
    return null;
  }

  return (
    <Polymorphic as={as} ref={refCallback}>
      {children}
    </Polymorphic>
  );
}

export default UnmountAfterAnimation;
