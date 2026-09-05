import { useEffect, useRef } from "react";
import { PALMS } from "../Data/plams";
import { gsap } from "../lib/gsapConfig";

const LEVEL_COLOR = { high: "#1F8A54", med: "#E08A34", low: "#C9645B" };
const LEVEL_LABEL = { high: "High", med: "Medium", low: "Low" };
const LEVELS = ["high", "med", "low"];

function countBy(key) {
  return LEVELS.map((level) => ({
    level,
    count: PALMS.filter((p) => p[key] === level).length,
  }));
}

function ChartGroup({ title, data, total }) {
  return (
    <div className="flex-1 min-w-[240px]">
      <div className="text-[13.5px] font-extrabold text-[var(--heading)] mb-3 dark:text-white">{title}</div>
      <div className="flex flex-col gap-2.5">
        {data.map((d) => (
          <div key={d.level} className="flex items-center gap-3">
            <div className="w-16 text-[12px] font-bold text-[var(--muted)] flex-shrink-0 dark:text-stone-200">{LEVEL_LABEL[d.level]}</div>
            <div className="flex-1 h-[10px] rounded-full bg-[var(--level-off)] overflow-hidden dark:bg-stone-700/80">
              <div
                className="chart-bar h-full rounded-full"
                style={{
                  width: "0%",
                  backgroundColor: LEVEL_COLOR[d.level],
                }}
                data-target={total ? (d.count / total) * 100 : 0}
              ></div>
            </div>
            <div className="w-6 text-[12px] font-extrabold text-[var(--heading)] text-right flex-shrink-0 dark:text-white">{d.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VarietyChart() {
  const chartRef = useRef(null);
  const total = PALMS.length;
  const salinityData = countBy("salinity");
  const waterData = countBy("water");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(chartRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: chartRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.utils.toArray(".chart-bar").forEach((bar) => {
        const target = Number(bar.dataset.target);
        gsap.to(bar, {
          width: `${target}%`,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={chartRef}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-[20px] px-7 py-6 shadow mb-9 flex flex-wrap gap-8 transition-colors duration-300"
    >
      <div className="w-full flex items-baseline justify-between mb-1 flex-wrap gap-2">
        <h2 className="text-[19px] text-[var(--heading)] font-extrabold dark:text-white">Variety distribution at a glance</h2>
        <div className="text-[13.5px] text-[var(--muted)] dark:text-stone-200">Based on all {total} documented varieties</div>
      </div>
      <ChartGroup title="Salinity tolerance" data={salinityData} total={total} />
      <ChartGroup title="Water needs" data={waterData} total={total} />
    </div>
  );
}