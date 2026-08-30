import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "../lib/gsapConfig";

const LEVEL_LABEL = {
  high: "High",
  med: "Medium",
  low: "Low"
};

const LEVEL_PCT = {
  high: 100,
  med: 62,
  low: 28
};

const LEVEL_COLOR = {
  high: "var(--accent)",
  med: "var(--accent-amber)",
  low: "var(--accent-red)"
};

function LevelMeter({ level }) {
  return (
    <div className="flex items-center gap-2.5 flex-1">
      <div className="relative flex-1 h-[6px] rounded-full bg-[var(--level-off)] overflow-hidden">
        <div
          className="h-full rounded-full relative overflow-hidden transition-all duration-500 ease-out"
          style={{
            width: `${LEVEL_PCT[level]}%`,
            backgroundColor: LEVEL_COLOR[level]
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </div>

      <span
        className="text-[11px] font-extrabold px-2 py-[3px] rounded-full flex-shrink-0"
        style={{
          color: LEVEL_COLOR[level],
          backgroundColor: `color-mix(in srgb, ${LEVEL_COLOR[level]} 14%, transparent)`
        }}
      >
        {LEVEL_LABEL[level]}
      </span>
    </div>
  );
}

function PalmCard({ palm, isActive, isDimmed, onToggle }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      scale: isActive ? 1.035 : 1,
      duration: 0.4,
      ease: "power3.out"
    });
  }, [isActive]);

  const goToDetails = (e) => {
    e.stopPropagation();
    navigate(`/plant/${palm.id}`);
  };

  return (
    <div
      ref={cardRef}
      onClick={onToggle}
      className={`
        palm-card-item
        group
        relative
        bg-[var(--surface)]
        border
        border-[var(--border)]
        rounded-2xl
        p-6
        flex
        flex-col
        gap-4
        cursor-pointer
        transition-[filter,opacity,box-shadow,border-color]
        duration-300
        ${isActive
          ? "shadow-[0_24px_48px_-16px_rgba(0,0,0,0.4)] border-transparent z-10"
          : ""}
        ${isDimmed ? "blur-[2px] opacity-75" : ""}
      `}
    >
      <div className={`glow-ring ${isActive ? "is-active" : ""}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3.5 items-start min-w-0">
          <div className="w-12 h-12 rounded-[12px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[var(--tag-green-bg)] to-[var(--tag-tan-bg)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-[24px] h-[24px] text-[var(--accent)]"
            >
              <path
                d="M12 21V13M12 13C12 8 9 6 5 6C5 10 7.5 13 12 13ZM12 13C12 8 15 6 19 6C19 10 16.5 13 12 13Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h3 className="text-[19px] font-extrabold text-[var(--heading)] truncate dark:text-white">
              {palm.name}
            </h3>
          </div>
        </div>

        <div className="bg-[var(--tag-tan-bg)] text-[var(--tag-tan-text)] text-[11px] font-extrabold px-2.5 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
          {palm.shade} m²
        </div>
      </div>

      <p className="text-[13.5px] text-[var(--muted)] leading-relaxed min-h-[42px] dark:text-stone-200">
        {palm.desc}
      </p>

      <div className="flex flex-col gap-3 py-1">
        <div className="flex items-center gap-3">
          <div className="text-[12px] text-[var(--muted)] font-bold w-[92px] flex-shrink-0 dark:text-stone-200">
            Salinity
          </div>
          <LevelMeter level={palm.salinity} />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-[12px] text-[var(--muted)] font-bold w-[92px] flex-shrink-0 dark:text-stone-200">
            Water needs
          </div>
          <LevelMeter level={palm.water} />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {palm.areas.map((a) => (
          <span
            className="text-[11px] font-bold text-[var(--tag-green-text)] bg-[var(--tag-green-bg)] px-2.5 py-1 rounded-full"
            key={a}
          >
            {a}
          </span>
        ))}
      </div>

      <div className="flex gap-2.5 items-start text-[12.5px] text-[var(--muted)] bg-[var(--surface-soft)] border border-[var(--border)] rounded-[11px] px-3.5 py-3 leading-relaxed dark:text-stone-200 dark:bg-stone-800/60">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[var(--accent-amber)]"
        >
          <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
        </svg>

        <span>{palm.tip}</span>
      </div>

      {isActive && (
        <div className="absolute -bottom-4 inset-x-0 flex justify-center z-20">
          <button
            onClick={goToDetails}
            className="shine-btn inline-flex items-center gap-1.5 bg-[var(--accent)] text-white text-[11px] font-bold px-4 py-2 rounded-full shadow-[0_8px_20px_-6px_rgba(0,0,0,0.5)] hover:opacity-90 transition-opacity"
          >
            View Details
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="w-2.5 h-2.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default function CardsGrid({ palms }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pb-16">
      {palms.map((palm) => (
        <PalmCard
          key={palm.id}
          palm={palm}
          isActive={activeId === palm.id}
          isDimmed={activeId !== null && activeId !== palm.id}
          onToggle={() =>
            setActiveId((current) =>
              current === palm.id ? null : palm.id
            )
          }
        />
      ))}
    </section>
  );
}