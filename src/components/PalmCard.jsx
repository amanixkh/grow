import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapConfig";

const LEVEL_LABEL = { high: "High", med: "Medium", low: "Low" };
const LEVEL_PCT = { high: 100, med: 62, low: 28 };
const LEVEL_COLOR = { high: "var(--color-accent)", med: "var(--color-accent-amber)", low: "var(--color-accent-red)" };

function LevelMeter({ level }) {
  return (
    <div className="flex items-center gap-2.5 flex-1">
      <div className="relative flex-1 h-1.5 rounded-full bg-level-off overflow-hidden">
        <div
          className="h-full rounded-full relative overflow-hidden transition-all duration-500 ease-out"
          style={{ width: `${LEVEL_PCT[level]}%`, backgroundColor: LEVEL_COLOR[level] }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_0%,rgba(255,255,255,0)_55%)]"></div>
        </div>
      </div>
      <span
        className="text-[11px] font-extrabold px-2 py-[3px] rounded-full flex-shrink-0"
        style={{ color: LEVEL_COLOR[level], backgroundColor: `color-mix(in srgb, ${LEVEL_COLOR[level]} 14%, transparent)` }}
      >
        {LEVEL_LABEL[level]}
      </span>
    </div>
  );
}

export default function PalmCard({ palm, isActive, isDimmed, onToggle }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: isActive ? 1.035 : 1,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      onClick={onToggle}
      className={`palm-card-item group relative bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4 cursor-pointer
        transition-[filter,opacity,box-shadow,border-color] duration-300
        ${isActive ? "shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] border-transparent z-10" : ""}
        ${isDimmed ? "blur-[2px] opacity-75" : ""}`}
    >
      <div className={`glow-ring ${isActive ? "is-active" : ""}`}></div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3.5 items-start min-w-0">
          <div className="w-12 h-12 rounded-[12px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-tag-green-bg to-tag-tan-bg">
            <svg viewBox="0 0 24 24" fill="none" className="w-[24px] h-[24px] text-accent">
              <path d="M12 21V13M12 13C12 8 9 6 5 6C5 10 7.5 13 12 13ZM12 13C12 8 15 6 19 6C19 10 16.5 13 12 13Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-[16.5px] font-extrabold text-heading truncate">{palm.name}</h3>
            <div className="text-[12px] text-faint font-medium mt-0.5 italic leading-snug">{palm.latin}</div>
          </div>
        </div>
        <div className="bg-tag-tan-bg text-tag-tan-text text-[11px] font-extrabold px-2.5 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
          {palm.shade} m²
        </div>
      </div>

      <p className="text-[13.5px] text-muted leading-relaxed min-h-[42px]">{palm.desc}</p>

      <div className="flex flex-col gap-3 py-1">
        <div className="flex items-center gap-3">
          <div className="text-[12px] text-muted font-bold w-[92px] flex-shrink-0">Salinity</div>
          <LevelMeter level={palm.salinity} />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[12px] text-muted font-bold w-[92px] flex-shrink-0">Water needs</div>
          <LevelMeter level={palm.water} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {palm.areas.map((a) => (
          <span className="text-[11px] font-bold text-tag-green-text bg-tag-green-bg px-2.5 py-1 rounded-full" key={a}>{a}</span>
        ))}
      </div>

      <div className="flex gap-2.5 items-start text-[12.5px] text-muted bg-surface-soft border border-border rounded-[11px] px-3.5 py-3 leading-relaxed">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-accent-amber">
          <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
        </svg>
        <span>{palm.tip}</span>
      </div>
    </div>
  );
}