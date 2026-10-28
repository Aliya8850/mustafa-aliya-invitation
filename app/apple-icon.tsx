import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so this one is full-bleed.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg width="180" height="180" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a2a16" />
            <stop offset="1" stopColor="#150a06" />
          </linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6e4ad" />
            <stop offset="0.5" stopColor="#d4ab55" />
            <stop offset="1" stopColor="#9a7024" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" fill="url(#bg)" />
        <rect
          x="3"
          y="3"
          width="58"
          height="58"
          rx="9"
          fill="none"
          stroke="url(#gold)"
          strokeOpacity="0.55"
          strokeWidth="1.2"
        />
        <path
          d="M15 55 V30 C15 20 27 17 32 7 C37 17 49 20 49 30 V55 Z"
          fill="#24130b"
          stroke="url(#gold)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <g transform="translate(19.5 24) scale(0.56)" fill="url(#gold)">
          <path d="M31 6a18 18 0 1 0 0 36 14.5 14.5 0 0 1 0-36Z" />
          <path d="m37 17 1.6 3.9 4.2.3-3.2 2.7 1 4.1-3.6-2.2-3.6 2.2 1-4.1-3.2-2.7 4.2-.3Z" />
        </g>
      </svg>
    ),
    size,
  );
}
