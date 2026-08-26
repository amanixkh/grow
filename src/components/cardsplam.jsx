import { useEffect, useRef, useState } from "react";
import PalmCard from "./PalmCard";
import { gsap } from "../lib/gsapConfig";

export default function CardsGrid({ palms }) {
  const gridRef = useRef(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll(".palm-card-item");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.035,
          ease: "power1.out",
          clearProps: "transform",
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [palms]);

  return (
    <>
      <div className="flex items-center gap-3.5 my-2 mb-6">
        <h2 className="text-[22px] font-extrabold text-heading whitespace-nowrap tracking-tight">
          Documented Varieties
        </h2>
        <span className="text-[12px] font-bold text-tag-green-text bg-tag-green-bg px-2.5 py-1 rounded-full whitespace-nowrap">
          {palms.length}
        </span>
        <div className="h-px bg-gradient-to-r from-border to-transparent w-full"></div>
      </div>

      <section
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-[70px] items-start"
      >
        {palms.map((p) => (
          <PalmCard
            key={p.id}
            palm={p}
            isActive={activeId === p.id}
            isDimmed={activeId !== null && activeId !== p.id}
            onToggle={() => setActiveId((cur) => (cur === p.id ? null : p.id))}
          />
        ))}
      </section>

      {palms.length === 0 && (
        <div className="text-center py-20 px-5 text-muted bg-surface-soft border border-dashed border-border rounded-2xl">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-tag-tan-bg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-tag-tan-text">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>
          <h3 className="text-heading text-[17px] font-extrabold mb-1.5">No matching results</h3>
          <p className="text-[13.5px]">Try a different search term or reset the filters.</p>
        </div>
      )}
    </>
  );
}