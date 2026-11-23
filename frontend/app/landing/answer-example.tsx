"use client";

import { useState } from "react";

import type { Content } from "./content";

// An illustrative answer, not a recorded run. The layout is what the app does for
// every reply: the answer first, then the passages it was built from.
export function AnswerExample({ t }: { t: Content["example"] }) {
  const [active, setActive] = useState<number>(1);

  return (
    <figure className="sk-frame">
      <div className="sk-frame__bar">
        <span className="sk-frame__name">Stark</span>
        <span className="sk-frame__ws">{t.workspace}</span>
      </div>

      <div className="sk-frame__body">
        <p className="sk-q">{t.question}</p>

        <p className="sk-a">
          {t.answer[0]}
          <Cite id={1} label={t.sourceAria} active={active} onSelect={setActive} />
          {t.answer[1]}
          <Cite id={2} label={t.sourceAria} active={active} onSelect={setActive} />
          {t.answer[2]}
        </p>

        <ul className="sk-sources" aria-label={t.sourcesLabel}>
          {t.sources.map((s, i) => {
            const id = i + 1;
            return (
              <li key={id}>
                {/* The whole card is the button, not only its title row. */}
                <button
                  type="button"
                  className={`sk-source ${active === id ? "is-active" : ""}`}
                  onClick={() => setActive(id)}
                  aria-pressed={active === id}
                >
                  <span className="sk-source__head">
                    <span className="sk-source__n">{id}</span>
                    <span className="sk-source__file">{s.file}</span>
                    <span className="sk-source__where">{s.where}</span>
                  </span>
                  <span className="sk-source__text">
                    {s.before}
                    <mark className={`sk-mark ${active === id ? "is-on" : ""}`}>
                      {s.mark}
                    </mark>
                    {s.after}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <figcaption className="sk-frame__cap">{t.caption}</figcaption>
    </figure>
  );
}

function Cite({
  id,
  label,
  active,
  onSelect,
}: {
  id: number;
  label: string;
  active: number;
  onSelect: (id: number) => void;
}) {
  return (
    <button
      type="button"
      className={`sk-cite ${active === id ? "is-active" : ""}`}
      onClick={() => onSelect(id)}
      onMouseEnter={() => onSelect(id)}
      onFocus={() => onSelect(id)}
      aria-label={`${label} ${id}`}
    >
      {id}
    </button>
  );
}
