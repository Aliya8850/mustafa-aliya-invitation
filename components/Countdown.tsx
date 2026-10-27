"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1000);
  return () => window.clearInterval(id);
}

const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
  targetISO,
  label,
}: {
  targetISO: string;
  label: string;
}) {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  const target = Math.floor(new Date(targetISO).getTime() / 1000);
  const diff = now === null ? null : target - now;

  if (diff !== null && diff <= 0) {
    return (
      <p className="countdown-done">
        Alhamdulillah — the celebrations have begun.
      </p>
    );
  }

  const parts: [string, string][] =
    diff === null
      ? [
          ["Days", "--"],
          ["Hours", "--"],
          ["Minutes", "--"],
          ["Seconds", "--"],
        ]
      : [
          ["Days", String(Math.floor(diff / 86400))],
          ["Hours", pad(Math.floor((diff % 86400) / 3600))],
          ["Minutes", pad(Math.floor((diff % 3600) / 60))],
          ["Seconds", pad(diff % 60)],
        ];

  return (
    <div>
      <p className="eyebrow">Counting down to {label}</p>
      <div className="countdown" role="timer" aria-live="off">
        {parts.map(([unit, value]) => (
          <div className="count-cell" key={unit}>
            <span className="count-num">{value}</span>
            <span className="count-unit">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
