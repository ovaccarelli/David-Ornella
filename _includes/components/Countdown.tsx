"use client";

import { useEffect, useState } from "react";
import { weddingDate } from "@/_data/site";

const labels = { days: "giorni", hours: "ore", minutes: "minuti", seconds: "secondi" };

export function Countdown() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, new Date(weddingDate).getTime() - Date.now());
      setRemaining({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance / 3_600_000) % 24),
        minutes: Math.floor((distance / 60_000) % 60),
        seconds: Math.floor((distance / 1_000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="countdown" aria-label="Conto alla rovescia">
      {Object.entries(remaining).map(([label, value]) => (
        <div className="countdownItem" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{labels[label as keyof typeof labels]}</span>
        </div>
      ))}
    </div>
  );
}
