"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";

import { LANGS, type Lang } from "./content";

// A native select: full language names, one target instead of four, and phones
// open their own picker. Each language is still its own URL, so choosing one
// navigates there. The other versions are listed in the page head (hreflang).
export function LanguageSelect({ current, label }: { current: Lang; label: string }) {
  const router = useRouter();

  return (
    <div className="sk-select">
      <select
        aria-label={label}
        value={current}
        onChange={(event) => {
          const next = LANGS.find((l) => l.code === event.target.value);
          if (next) router.push(next.path as Route);
        }}
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code} lang={l.code === "pt" ? "pt-PT" : l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
