import type { Metadata } from "next";

import { metadataFor } from "./content";
import { LandingView } from "./landing-view";

export const metadata: Metadata = metadataFor("en");

// English lives at /landing. The other languages are at /landing/pt, /es and /fr.
export default function LandingPage() {
  return <LandingView lang="en" />;
}
