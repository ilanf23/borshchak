import { useEffect, useRef, useState } from "react";

type AnimationDirection = "up" | "left" | "right" | "scale";

export function useScrollAnimation(threshold = 0.15, direction: AnimationDirection = "up") {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const hiddenClass = direction === "left" ? "scroll-hidden-left" 
    : direction === "right" ? "scroll-hidden-right"
    : direction === "scale" ? "scroll-hidden-scale"
    : "scroll-hidden";

  const visibleClass = direction === "left" ? "scroll-visible-left"
    : direction === "right" ? "scroll-visible-right"
    : direction === "scale" ? "scroll-visible-scale"
    : "scroll-visible";

  return { 
    ref, 
    isVisible,
    className: isVisible ? visibleClass : hiddenClass,
  };
}
