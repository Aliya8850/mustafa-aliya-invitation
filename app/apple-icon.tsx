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
            <stop offset="0" stopColor="#f4fbf1" />
            <stop offset="1" stopColor="#cfe6c6" />
          </linearGradient>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a9d8a0" />
            <stop offset="0.5" stopColor="#5f9a6e" />
            <stop offset="1" stopColor="#3f7a55" />
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
          stroke="#5f8c69"
          strokeOpacity="0.9"
          strokeWidth="1.6"
        />
        <path d="M32 52 C14 39 11 28 11 22 C11 14.5 16.5 10 23 10 C27 10 30 12.2 32 16 C34 12.2 37 10 41 10 C47.5 10 53 14.5 53 22 C53 28 50 39 32 52 Z" fill="url(#gold)" />
        <path
          d="M20 21 C20 17.5 22.5 16 25 16"
          fill="none"
          stroke="#f4fff1"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    size,
  );
}
