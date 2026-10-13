"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";

const SHADES = [
  { code: "C4", color: "#C8B285" },
  { code: "A3.5", color: "#D6C194" },
  { code: "A3", color: "#DFCCA3" },
  { code: "A2", color: "#E7D8B5" },
  { code: "A1", color: "#EFE5CB" },
  { code: "B1", color: "#F5EEDC" },
  { code: "BL2", color: "#FBF8EF" },
];

// Upper front teeth, centre outwards, as [x, width, height].
const TEETH: [number, number, number][] = [
  [121, 28, 40],
  [151, 28, 40],
  [97, 23, 34],
  [180, 23, 34],
  [77, 19, 28],
  [204, 19, 28],
  [60, 16, 22],
  [224, 16, 22],
];

/**
 * A shade guide on a drawn smile. Drag through the dentist's shade scale and the teeth change
 * colour; the first time it comes into view it plays a typical whitening result on its own.
 */
export function ShadeGuide() {
  const [index, setIndex] = useState(1);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, "0px 0px -30% 0px");
  const reduce = useReducedMotion();
  const id = useId();
  const shade = SHADES[index]!;

  useEffect(() => {
    if (!inView || reduce) return;
    let step = 1;
    const timer = window.setInterval(() => {
      if (touched.current || step >= 5) {
        window.clearInterval(timer);
        return;
      }
      step += 1;
      setIndex(step);
    }, 450);
    return () => window.clearInterval(timer);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="card grid gap-6 p-6 sm:p-8">
      <svg viewBox="40 16 220 116" className="mx-auto w-full max-w-md" role="img" aria-label={`Teeth shown at shade ${shade.code}`}>
        <defs>
          <clipPath id={`${id}-mouth`}>
            <path d="M48 40 Q 150 122 252 40 Q 150 50 48 40 Z" />
          </clipPath>
        </defs>
        <path d="M48 40 Q 150 122 252 40 Q 150 50 48 40 Z" fill="#6E2632" />
        <g clipPath={`url(#${id}-mouth)`}>
          {TEETH.map(([x, w, h]) => (
            <rect key={x} x={x} y={38} width={w} height={h} rx={w / 3} className="shade-tooth" style={{ fill: shade.color }} stroke="#B9A88A" strokeWidth="1" />
          ))}
        </g>
        <path d="M42 40 Q 96 20 150 31 Q 204 20 258 40 Q 150 47 42 40 Z" fill="#C46A6A" />
        <path d="M42 40 Q 150 140 258 40 Q 150 122 42 40 Z" fill="#C46A6A" />
        {index >= 5 ? (
          <g key={shade.code} className="pop-in" style={{ transformOrigin: "196px 52px" }}>
            <path d="M196 42 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#FFFFFF" stroke="#2F5D4A" strokeWidth="1" />
          </g>
        ) : null}
      </svg>

      <div className="grid gap-3">
        <div className="flex items-baseline justify-between">
          <label htmlFor={id} className="font-semibold">
            Shade
          </label>
          <output htmlFor={id} className="font-display text-2xl font-semibold">
            {shade.code}
          </output>
        </div>
        <input
          id={id}
          type="range"
          min={0}
          max={SHADES.length - 1}
          step={1}
          value={index}
          aria-valuetext={`Shade ${shade.code}`}
          onChange={(e) => {
            touched.current = true;
            setIndex(Number(e.target.value));
          }}
          className="accent-[var(--accent)]"
        />
        <div aria-hidden="true" className="grid grid-cols-7 gap-1">
          {SHADES.map((s, i) => (
            <span key={s.code} className={`grid gap-1 text-center text-xs ${i === index ? "font-bold text-fg" : "text-muted"}`}>
              <span className={`h-6 rounded-md border transition-transform duration-300 ${i === index ? "scale-110 border-accent" : "border-border"}`} style={{ background: s.color }} />
              {s.code}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
