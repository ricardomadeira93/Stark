"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Content } from "./content";
import { useInView } from "./use-in-view";

const STEP_MS = 640;

type Stage = Content["flow"]["stages"][number];

// A query travels through the real stages. One marker glides from stage to stage
// (transform only) and each stage lights up when it arrives.
export function PipelineFlow({ t }: { t: Content["flow"] }) {
  const stages = t.stages;
  const { ref: viewRef, seen } = useInView<HTMLDivElement>(0.35);
  const stageRefs = useRef<(HTMLElement | null)[]>([]);
  const markerRef = useRef<HTMLSpanElement>(null);
  const timers = useRef<number[]>([]);
  const [step, setStep] = useState(-1);
  const [done, setDone] = useState(false);

  const clear = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const moveMarker = useCallback(
    (index: number) => {
      const wrap = viewRef.current;
      const stage = stageRefs.current[index];
      const marker = markerRef.current;
      if (!wrap || !stage || !marker) return;
      // One layout read per step, never per frame.
      const w = wrap.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      // Sit on the top left corner of the stage, like a pin, so it never covers text.
      const x = s.left - w.left + 14;
      const y = s.top - w.top - 6;
      marker.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [viewRef],
  );

  const run = useCallback(() => {
    clear();
    setDone(false);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(stages.length - 1);
      setDone(true);
      return;
    }

    setStep(-1);
    stages.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          const marker = markerRef.current;
          if (i === 0 && marker) {
            // Place the marker on the first stage without gliding in from the corner.
            marker.style.transition = "none";
            moveMarker(0);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => {
                marker.style.transition = "";
              }),
            );
          } else {
            moveMarker(i);
          }
          setStep(i);
          if (i === stages.length - 1) {
            timers.current.push(window.setTimeout(() => setDone(true), STEP_MS));
          }
        }, 250 + i * STEP_MS),
      );
    });
  }, [clear, moveMarker, stages]);

  useEffect(() => {
    if (seen) run();
    return clear;
  }, [seen, run, clear]);

  return (
    <div ref={viewRef} className="sk-flowwrap">
      <button type="button" className="sk-replay" onClick={run}>
        {t.replay}
      </button>

      <ol className="sk-flow" aria-label={t.label}>
        {stages.map((stage, i) => (
          <FlowItem
            key={stage[0].title}
            stage={stage}
            lit={step >= i}
            mark={done && i === stages.length - 1}
            last={i === stages.length - 1}
            setRef={(el) => {
              stageRefs.current[i] = el;
            }}
          />
        ))}
      </ol>

      <span
        ref={markerRef}
        aria-hidden="true"
        className={`sk-marker ${step >= 0 && !done ? "is-on" : ""}`}
      />
    </div>
  );
}

function FlowItem({
  stage,
  lit,
  mark,
  last,
  setRef,
}: {
  stage: Stage;
  lit: boolean;
  mark: boolean;
  last: boolean;
  setRef: (el: HTMLElement | null) => void;
}) {
  const pair = stage.length > 1;
  return (
    <>
      <li ref={setRef} className={pair ? "sk-pair" : "sk-node"} data-lit={lit}>
        {pair ? (
          stage.map((s) => (
            <div key={s.title} className="sk-node" data-lit={lit}>
              <strong>{s.title}</strong>
              <span>{s.text}</span>
            </div>
          ))
        ) : (
          <>
            <strong>
              <span className={`sk-flowmark ${mark ? "is-on" : ""}`}>{stage[0].title}</span>
            </strong>
            <span>{stage[0].text}</span>
          </>
        )}
      </li>
      {!last ? <li className="sk-arrow" aria-hidden="true" data-lit={lit} /> : null}
    </>
  );
}
