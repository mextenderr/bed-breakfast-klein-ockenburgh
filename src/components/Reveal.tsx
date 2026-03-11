"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  distance?: number;
};

export default function Reveal({
  children,
  className,
  delayMs = 0,
  distance = 18,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.unobserve(entry.target);
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={
        {
          "--reveal-delay": `${delayMs}ms`,
          "--reveal-distance": `${distance}px`,
        } as CSSProperties
      }
      className={cn("reveal", visible && "reveal-visible", className)}
    >
      {children}
    </div>
  );
}
