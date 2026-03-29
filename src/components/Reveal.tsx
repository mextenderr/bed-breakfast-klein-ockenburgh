"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  distance?: number;
  direction?: "up" | "left" | "right";
};

export default function Reveal({
  children,
  className,
  delayMs = 0,
  distance = 18,
  direction = "up",
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
          "--reveal-direction": direction,
        } as CSSProperties
      }
      className={cn(
        direction === "left"
          ? "reveal-x reveal-x-left"
          : direction === "right"
            ? "reveal-x reveal-x-right"
            : "reveal",
        visible && (direction === "up" ? "reveal-visible" : "reveal-x-visible"),
        className,
      )}
    >
      {children}
    </div>
  );
}
