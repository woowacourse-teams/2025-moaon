import {
  type ElementType,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Polymorphic from "../Polymorphic/Polymorphic";

interface DelayUnmountProps<T extends ElementType = "div"> {
  visible: boolean;
  as?: T;
}

function UnmountAnimation({
  visible,
  children,
  as = "div",
}: PropsWithChildren<DelayUnmountProps>) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
  }, [visible]);

  const unmount = () => {
    if (visible) {
      return;
    }

    setMounted(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Polymorphic as={as} onTransitionEnd={unmount} onAnimationEnd={unmount}>
      {children}
    </Polymorphic>
  );
}

export default UnmountAnimation;
