import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}

export default function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  const transforms: Record<string, string> = {
    up: "translateY(24px)",
    left: "translateX(-24px)",
    right: "translateX(24px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
