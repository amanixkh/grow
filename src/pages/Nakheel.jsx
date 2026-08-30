import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import FilterPanel from "../components/filterPanel";
import CardsGrid from "../components/cardsplam";
import Footer from "../components/footer";
import { PALMS, LEVEL_RANK } from "../Data/plams";
import { useLanguage } from "../LanguageContext";

const DEFAULT_FILTERS = {
  query: "",
  region: "",
  salinity: "",
  water: "",
  sort: "name",
};

const dashboardStats = [
  {
    value: 14,
    label: "Documented palm varieties",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" aria-hidden="true">
        <path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    tone: "from-[var(--tag-green-bg)] to-[var(--tag-tan-bg)]",
    color: "#1F8A54",
  },
  {
    value: 14,
    label: "Regions covered across Iraq",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" aria-hidden="true">
        <path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    tone: "from-[var(--tag-tan-bg)] to-[var(--tag-tan-bg)]",
    color: "#A85A15",
  },
  {
    value: 4,
    label: "Highly salinity-tolerant varieties",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" aria-hidden="true">
        <path d="M12 2s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    tone: "from-[var(--tag-green-bg)] to-[var(--border)]",
    color: "#2C6E8A",
  },
  {
    value: 100,
    suffix: "%",
    label: "Runs entirely in the browser, no server",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" aria-hidden="true">
        <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
    tone: "from-[var(--tag-tan-bg)] to-[var(--tag-green-bg)]",
    color: "#E08A34",
  },
];

const salinityBreakdown = [
  { label: "High", value: 4, color: "#1F8A54" },
  { label: "Medium", value: 8, color: "#E08A34" },
  { label: "Low", value: 2, color: "#C9645B" },
];

const waterBreakdown = [
  { label: "High", value: 4, color: "#1F8A54" },
  { label: "Medium", value: 7, color: "#E08A34" },
  { label: "Low", value: 3, color: "#C9645B" },
];

export default function Nakheel() {
  const { lang } = useLanguage();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("nakheel-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("nakheel-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filteredPalms = useMemo(() => {
    const q = filters.query.trim().toLowerCase();

    let list = PALMS.filter((palm) => {
      const matchesQuery = !q || palm.name.toLowerCase().includes(q);
      const matchesRegion = !filters.region || palm.areas.includes(filters.region);
      const matchesSalinity = !filters.salinity || palm.salinity === filters.salinity;
      const matchesWater = !filters.water || palm.water === filters.water;

      return matchesQuery && matchesRegion && matchesSalinity && matchesWater;
    });

    if (filters.sort === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filters.sort === "shade") {
      list.sort((a, b) => b.shade - a.shade);
    }

    if (filters.sort === "salinity") {
      list.sort((a, b) => LEVEL_RANK[b.salinity] - LEVEL_RANK[a.salinity]);
    }

    return list;
  }, [filters]);

  const hasActiveFilter =
    !!filters.query ||
    !!filters.region ||
    !!filters.salinity ||
    !!filters.water;

  const labels = {
    title: lang === "ar" ? "معلومات سريعة" : "Quick overview",
    varieties: lang === "ar" ? "أنواع النخيل المسجلة" : "Documented palm varieties",
    regions: lang === "ar" ? "المناطق المغطاة في العراق" : "Regions covered across Iraq",
    tolerant: lang === "ar" ? "أنواع تتحمل الملوحة العالية" : "Highly salinity-tolerant varieties",
    browser: lang === "ar" ? "يعمل بالكامل داخل المتصفح بدون خادم" : "Runs entirely in the browser, no server",
    chartTitle: lang === "ar" ? "توزيع الأنواع في لمحة سريعة" : "Variety distribution at a glance",
    subtitle: lang === "ar" ? "استناداً إلى جميع 14 نوعاً مسجلاً" : "Based on all 14 documented varieties",
    salinity: lang === "ar" ? "مقاومة الملوحة" : "Salinity tolerance",
    water: lang === "ar" ? "احتياجات المياه" : "Water needs",
    find: lang === "ar" ? "ابحث عن النوع المناسب" : "Find the right variety",
    hint: lang === "ar" ? "قم بتصفية الظروف الزراعية للعثور على الأنسب" : "Filter by growing conditions to narrow things down",
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? "bg-[#0b1f15] text-white" : "bg-[#f4f1ea] text-[#1e293b]"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <Navbar variant="dashboard" darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />

      <main className="mx-auto max-w-7xl px-6">
        <section className="py-2 pb-11">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-4">
            {dashboardStats.map((stat, index) => (
              <div
                key={stat.label}
                className="group bg-[var(--surface)] px-6 py-6 transition-colors duration-300 hover:bg-[var(--surface-soft)]"
              >
                <div
                  className={`mb-3 flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br ${stat.tone} transition-transform duration-300 group-hover:scale-110`}
                  style={{ color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="font-serif text-[30px] font-black text-[var(--heading)] dark:text-white">
                  {stat.value}
                  {stat.suffix || ""}
                </div>
                <div className="mt-1.5 text-[13px] font-medium text-[var(--muted)] dark:text-stone-200">
                  {index === 0 && labels.varieties}
                  {index === 1 && labels.regions}
                  {index === 2 && labels.tolerant}
                  {index === 3 && labels.browser}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-9 flex flex-wrap gap-8 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] px-7 py-6 shadow transition-colors duration-300">
          <div className="mb-1 flex w-full flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[19px] font-extrabold text-[var(--heading)] dark:text-white">
              {labels.chartTitle}
            </h2>
            <div className="text-[13.5px] text-[var(--muted)] dark:text-stone-200">
              {labels.subtitle}
            </div>
          </div>

          <div className="min-w-[240px] flex-1">
            <div className="mb-3 text-[13.5px] font-extrabold text-[var(--heading)] dark:text-white">
              {labels.salinity}
            </div>
            <div className="flex flex-col gap-2.5">
              {salinityBreakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-16 flex-shrink-0 text-[12px] font-bold text-[var(--muted)] dark:text-stone-200">
                    {item.label}
                  </div>
                  <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[var(--level-off)] dark:bg-stone-700/80">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.value / 14) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <div className="w-6 flex-shrink-0 text-right text-[12px] font-extrabold text-[var(--heading)] dark:text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[240px] flex-1">
            <div className="mb-3 text-[13.5px] font-extrabold text-[var(--heading)] dark:text-white">
              {labels.water}
            </div>
            <div className="flex flex-col gap-2.5">
              {waterBreakdown.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-16 flex-shrink-0 text-[12px] font-bold text-[var(--muted)] dark:text-stone-200">
                    {item.label}
                  </div>
                  <div className="h-[10px] flex-1 overflow-hidden rounded-full bg-[var(--level-off)] dark:bg-stone-700/80">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(item.value / 14) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <div className="w-6 flex-shrink-0 text-right text-[12px] font-extrabold text-[var(--heading)] dark:text-white">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          resultCount={filteredPalms.length}
          totalCount={PALMS.length}
          hasActiveFilter={hasActiveFilter}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
        <CardsGrid palms={filteredPalms} />
      </main>
      <Footer />
    </div>
  );
}