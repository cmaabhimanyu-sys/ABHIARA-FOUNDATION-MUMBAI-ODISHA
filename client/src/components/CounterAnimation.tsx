import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function CounterAnimation({ end, duration = 2000, suffix = "", prefix = "" }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);
  const lastEnd = useRef(0);

  useEffect(() => {
    // Animate when in view AND we have a real value (end > 0)
    // Also re-animate if end value changes (e.g., CMS data loaded)
    if (!isInView || end === 0) return;
    if (hasAnimated.current && lastEnd.current === end) return;
    
    hasAnimated.current = true;
    lastEnd.current = end;

    let startTime: number | null = null;
    const startFrom = 0;
    
    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startFrom + eased * (end - startFrom));
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}
