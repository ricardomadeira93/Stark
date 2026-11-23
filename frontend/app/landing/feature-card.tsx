"use client";

import type { CSSProperties } from "react";

import { useInView } from "./use-in-view";

type FeatureCardProps = {
  title: string;
  body: string;
  file: string;
  code: string[];
  index: number;
};

// Enters with a short rise, then the code lines appear one after another, the
// way the output of a command would. Only opacity and transform are animated.
export function FeatureCard({ title, body, file, code, index }: FeatureCardProps) {
  const { ref, seen, pending } = useInView<HTMLElement>(0.15);

  return (
    <article
      ref={ref}
      className={`sk-feature ${pending ? "is-pending" : ""} ${seen ? "is-in" : ""}`}
      style={{ "--i": index % 2 } as CSSProperties}
    >
      <h3 className="sk-h3">{title}</h3>
      <p>{body}</p>
      <figure className="sk-code">
        <figcaption>{file}</figcaption>
        <pre>
          <code>
            {code.map((line, i) => (
              <span key={line} className="sk-line" style={{ "--l": i } as CSSProperties}>
                {line}
              </span>
            ))}
          </code>
        </pre>
      </figure>
    </article>
  );
}
