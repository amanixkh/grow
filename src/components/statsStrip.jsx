import { useEffect, useRef } from "react";
import { PALMS } from "../Data/plams";
import { gsap } from "../lib/gsapConfig";

export default function StatsStrip() {
  const sectionRef = useRef(null);

  const totalVarieties = PALMS.length;
  const totalRegions = new Set(PALMS.flatMap((p) => p.areas)).size;
  const highSalinityCount = PALMS.filter((p) => p.salinity === "high").length;

  const stats = [
    {
      num: totalVarieties,
      suffix: "",
      lab: "Documented palm varieties",
      bg: "from-[var(--tag-green-bg)] to-[var(--tag-tan-bg)]",
      color: "#1F8A54",
      icon: (
        <path d="M12 3l9 5-9 5-9-5 9-5z M3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      ),
    },
    {
      num: totalRegions,
      suffix: "",
      lab: "Regions covered across Iraq",
      bg: "from-[var(--tag-tan-bg)] to-[var(--tag-tan-bg)]",
      color: "#A85A15",
      icon: (
        <>
          <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" fill="none" />
          <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
        </>
      ),
    },
    {
      num: highSalinityCount,
      suffix: "",
      lab: "Highly salinity-tolerant varieties",
      bg: "from-[var(--tag-green-bg)] to-[var(--border)]",
      color: "#2C6E8A",
      icon: (
        <path d="M12 2s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z" stroke="currentColor" strokeWidth="1.6" fill="none" />
      ),
    },
    {
      num: 100,
      suffix: "%",
      lab: "Runs entirely in the browser, no server",
      bg: "from-[var(--tag-tan-bg)] to-[var(--tag-green-bg)]",
      color: "#E08A34",
      icon: (
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      ),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-box", {
        opacity: 0,
        y: 26,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(counter.val) + suffix;
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "restart reverse restart reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-2 pb-11">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden">
        {stats.map((s) => (
          <div
            className="stat-box group bg-[var(--surface)] px-6 py-6 transition-colors duration-300 hover:bg-[var(--surface-soft)]"
            key={s.lab}
          >
            <div
              className={`w-11 h-11 rounded-[12px] flex items-center justify-center bg-gradient-to-br ${s.bg} mb-3 transition-transform duration-300 group-hover:scale-110`}
              style={{ color: s.color }}
            >
              <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]">
                {s.icon}
              </svg>
            </div>
            <div
              className="stat-num font-serif font-black text-[30px] text-[var(--heading)] dark:text-white"
              data-value={s.num}
              data-suffix={s.suffix}
            >
              0{s.suffix}
            </div>
            <div className="text-[13px] text-[var(--muted)] mt-1.5 font-medium dark:text-stone-200">{s.lab}</div>
          </div>
        ))}
      </div>
    </section>
  );
}