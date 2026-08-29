import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsapConfig";

const REGION_OPTIONS = [
  ["", "All regions"],
  ["Shatt al-Arab", "Shatt al-Arab"],
  ["Abu al-Khaseeb", "Abu al-Khaseeb"],
  ["Zubair", "Zubair"],
  ["Qurna", "Qurna"],
  ["Fao", "Fao"],
];
const LEVEL_OPTIONS = [
  ["", "All"],
  ["high", "High"],
  ["med", "Medium"],
  ["low", "Low"],
];
const SORT_OPTIONS = [
  ["name", "Name (A–Z)"],
  ["shade", "Shade area (highest)"],
  ["salinity", "Salinity tolerance (highest)"],
];

const FIELD_ICON = {
  region: (
    <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z M12 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
  ),
  salinity: <path d="M12 2s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z" />,
  water: <path d="M12 3s5.5 6.2 5.5 10a5.5 5.5 0 11-11 0C6.5 9.2 12 3 12 3z" />,
  sort: <path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3" />,
};

const FIELDS = [
  { key: "region", label: "Region", options: REGION_OPTIONS },
  { key: "salinity", label: "Salinity tolerance", options: LEVEL_OPTIONS },
  { key: "water", label: "Water needs", options: LEVEL_OPTIONS },
  { key: "sort", label: "Sort by", options: SORT_OPTIONS },
];

export default function FilterPanel({
  filters,
  setFilters,
  resultCount,
  totalCount,
  hasActiveFilter,
  onReset,
}) {
  const panelRef = useRef(null);
  const countRef = useRef(null);
  const prevCount = useRef(resultCount);

  const update = (key) => (e) => setFilters({ ...filters, [key]: e.target.value });
  const clearOne = (key, fallback = "") => () => setFilters({ ...filters, [key]: fallback });

  const selectClass =
    "peer w-full appearance-none bg-[var(--surface)] border-[1.5px] border-[var(--border)] rounded-[12px] pl-10 pr-9 py-[11px] text-[13.5px] font-semibold text-[var(--text)] focus:border-[#1F8A54] focus:ring-4 focus:ring-[#1F8A54]/10 outline-none cursor-pointer transition-all hover:border-[var(--border-soft)]";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(panelRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top 88%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, panelRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (prevCount.current !== resultCount && countRef.current) {
      gsap.fromTo(
        countRef.current,
        { scale: 1.35, color: "#1F8A54" },
        { scale: 1, color: "#14663F", duration: 0.45, ease: "back.out(3)" }
      );
    }
    prevCount.current = resultCount;
  }, [resultCount]);

  const activeChips = [
    filters.query && { key: "query", label: `"${filters.query}"`, clear: clearOne("query") },
    filters.region && { key: "region", label: filters.region, clear: clearOne("region") },
    filters.salinity && {
      key: "salinity",
      label: `Salinity: ${LEVEL_OPTIONS.find(([v]) => v === filters.salinity)?.[1]}`,
      clear: clearOne("salinity"),
    },
    filters.water && {
      key: "water",
      label: `Water: ${LEVEL_OPTIONS.find(([v]) => v === filters.water)?.[1]}`,
      clear: clearOne("water"),
    },
  ].filter(Boolean);

  return (
    <section id="dashboard">
      <div
        ref={panelRef}
        className="relative bg-[var(--surface)] border border-[var(--border)] rounded-[22px] px-7 pt-7 pb-6 shadow-[0_8px_30px_-12px_rgba(15,61,46,0.15)] mb-9 overflow-hidden transition-colors duration-300"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1F8A54] via-[#34A868] to-[#E08A34]"></div>

        <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="text-[20px] text-[var(--heading)] font-extrabold tracking-tight">Find the right variety</h2>
            <p className="text-[13px] text-[var(--faint)] mt-0.5">Filter by growing conditions to narrow things down</p>
          </div>
          <div className="text-[13.5px] text-[var(--muted)] bg-[var(--surface-soft)] border border-[var(--border)] rounded-full px-3.5 py-1.5">
            <b ref={countRef} className="text-[#1F8A54] font-extrabold inline-block">{resultCount}</b> of {totalCount} varieties
          </div>
        </div>

        <div className="relative mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-[var(--faint)] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search by variety name… e.g. Barhee, Zahdi, Khastawi"
            value={filters.query}
            onChange={update("query")}
            className="w-full bg-[var(--surface-soft)] border-[1.5px] border-[var(--border)] rounded-[12px] pl-11 pr-11 py-3.5 outline-none text-[15px] text-[var(--text)] placeholder:text-[var(--faint)] focus:border-[#1F8A54] focus:ring-4 focus:ring-[#1F8A54]/10 transition-all"
          />
          {filters.query && (
            <button
              onClick={clearOne("query")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--border)] hover:bg-[var(--border-soft)] flex items-center justify-center transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2.5" className="w-3 h-3">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-[11.5px] font-extrabold text-[var(--muted)] uppercase tracking-wide mb-1.5">
                {f.label}
              </label>
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--faint)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none peer-focus:text-[#1F8A54]">
                  {FIELD_ICON[f.key]}
                </svg>
                <select value={filters[f.key]} onChange={update(f.key)} className={selectClass}>
                  {f.options.map(([val, label]) => (
                    <option value={val} key={val}>{label}</option>
                  ))}
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-[var(--faint)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {activeChips.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mt-5 pt-4 border-t border-dashed border-[var(--border)]">
            <span className="text-[12px] font-bold text-[var(--faint)] mr-0.5">Active:</span>
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.clear}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--tag-green-text)] bg-[var(--tag-green-bg)] hover:opacity-80 rounded-full pl-3 pr-2 py-1.5 transition-opacity"
              >
                {chip.label}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            ))}
            {hasActiveFilter && (
              <button
                onClick={onReset}
                className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[var(--tag-tan-text)] bg-[var(--tag-tan-bg)] hover:opacity-80 rounded-full px-3 py-1.5 transition-opacity ml-auto"
              >
                Reset all
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}