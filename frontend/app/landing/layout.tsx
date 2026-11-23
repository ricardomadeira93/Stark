import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { SITE_URL } from "./content";

// Archivo for headings, IBM Plex for text and code. Plex was drawn for IBM's
// technical documents, which suits a tool that reads documents.
const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sk-display",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sk-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sk-mono",
  display: "swap",
});

// Per-language titles and descriptions come from each page (see content.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// Standalone layout that intentionally bypasses the app shell (sidebar, topbar, onboarding gate).
export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
