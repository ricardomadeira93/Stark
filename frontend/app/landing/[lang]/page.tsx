import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { metadataFor, type Lang } from "../content";
import { LandingView } from "../landing-view";

const OTHER_LANGS: Lang[] = ["pt", "es", "fr"];

export const dynamicParams = false;

export function generateStaticParams() {
  return OTHER_LANGS.map((lang) => ({ lang }));
}

function parse(value: string): Lang {
  if (!OTHER_LANGS.includes(value as Lang)) notFound();
  return value as Lang;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metadataFor(parse(lang));
}

export default async function LocalizedLandingPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <LandingView lang={parse(lang)} />;
}
