import { type PropsWithChildren, useEffect, useState } from "react";

interface DelayUnmountProps {
  visible: boolean;
  delay: number;
}

function DelayUnmount({
  visible,
  delay,
  children,
}: PropsWithChildren<DelayUnmountProps>) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    let rafId: number | undefined;

    const step = (timestamp: number, startTime: number) => {
      if (visible) {
        setMounted(true);
        return;
      }

      const elapsed = timestamp - startTime;
      if (elapsed >= delay) {
        setMounted(false);
        return;
      }

      rafId = requestAnimationFrame((ts) => step(ts, startTime));
    };

    if (visible) {
      setMounted(true);
      return;
    }

    rafId = requestAnimationFrame((ts) => step(ts, ts));

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [visible, delay]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

export default DelayUnmount;
