import { useState, useEffect, useMemo, RefObject } from "react";

export function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      ),
    []
  );
  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, observer]);
  return isIntersecting;
}
