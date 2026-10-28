import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Aref_Ruqaa,
  Cinzel,
  Great_Vibes,
  Lora,
} from "next/font/google";
import "./globals.css";

const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const body = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const arabic = Amiri({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const calligraphy = Aref_Ruqaa({
  variable: "--font-calli",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Mustafa & Aliya | Wedding Invitation",
  description:
    "With great joy & happiness we cordially invite you to celebrate the wedding of Mustafa Shaikh & Aliya Khan — December 2026.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6fbf4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${arabic.variable} ${calligraphy.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
