import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  trigger: boolean;
}

export default function Confetti({ trigger }: ConfettiProps) {
  useEffect(() => {
    if (!trigger) return;

    // First burst. gold & teal (Abhiara colors)
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#F5A623", "#F5A623", "#FFD700", "#FFFFFF"];

    // Initial big burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
      zIndex: 9999,
    });

    // Continuous smaller bursts
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        zIndex: 9999,
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        zIndex: 9999,
      });
    }, 250);

    return () => clearInterval(interval);
  }, [trigger]);

  return null;
}
