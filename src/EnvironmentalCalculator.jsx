import { useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocation, useNavigate } from "react-router-dom";

const PALMS = [
  { id: "barhee", name: "Barhee", scientific: "Phoenix dactylifera", shade: 5.5, water: 180, carbon: 22, spacing: 7 },
  { id: "khadrawy", name: "Khadrawy", scientific: "Phoenix dactylifera", shade: 5.1, water: 155, carbon: 20, spacing: 8 },
  { id: "zahdi", name: "Zahidi", scientific: "Phoenix dactylifera", shade: 4.8, water: 145, carbon: 19, spacing: 9 },
];

const Leaf = ({ size = 22 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.8 3.2C13.2 3.4 6.4 6.1 4 11.3c-1.5 3.2.1 6.5 3.5 7.1 3.5.7 7.3-1.6 9.3-4.5 2.1-3.1 2.9-7.2 4-10.7ZM3.5 21c3.2-6.1 7.1-9.2 12.4-11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const LeafMark = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.8 3.2C13.2 3.4 6.4 6.1 4 11.3c-1.5 3.2.1 6.5 3.5 7.1 3.5.7 7.3-1.6 9.3-4.5 2.1-3.1 2.9-7.2 4-10.7Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M3.5 21c3.2-6.1 7.1-9.2 12.4-11.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const Arrow = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Moon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
const Sun = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;

function Slider({ label, value, min, max, unit, onChange }) {
  return <div className="space-y-3"><div className="flex justify-between gap-3"><label className="text-sm font-semibold text-white/85">{label}</label><span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/75">{value}{unit}</span></div><input aria-label={label} type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#8fbd91]" /><div className="flex justify-between text-[10px] text-white/30"><span>{min}{unit}</span><span>{max}{unit}</span></div></div>;
}

function Metric({ item, wide }) {
  const number = useRef(null); const bar = useRef(null);
  useGSAP(() => { gsap.fromTo(number.current, { innerText: 0 }, { innerText: item.value, duration: .7, snap: { innerText: 1 }, ease: "power2.out" }); gsap.to(bar.current, { width: `${item.progress}%`, duration: .8, ease: "power3.out" }); }, { dependencies: [item.value, item.progress] });
  return <article className={`metric rounded-[22px] border border-white/10 bg-white/[.045] p-5 ${wide ? "sm:col-span-2" : ""}`}><div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-[#8fbd91]/10 text-[#8fbd91]"><Leaf size={20} /></div><p className="text-xs font-semibold text-white/50">{item.title}</p><div className="mt-1 flex items-end gap-2"><strong ref={number} className="font-serif text-[34px] leading-none text-white">{item.value}</strong><span className="mb-0.5 text-[10px] font-bold text-white/35">{item.unit}</span></div><p className="mt-3 min-h-10 text-xs leading-5 text-white/40">{item.description}</p><div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div ref={bar} className="h-full w-0 rounded-full bg-[#8fbd91]" /></div></article>;
}

function Score({ value }) { const ring = useRef(null); useGSAP(() => gsap.to(ring.current, { strokeDashoffset: 283 - 2.83 * value, duration: 1, ease: "power3.out" }), { dependencies: [value] }); return <div className="relative grid place-items-center"><svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="7" className="text-white/10" /><circle ref={ring} cx="50" cy="50" r="45" fill="none" stroke="#8fbd91" strokeWidth="7" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="283" /></svg><div className="absolute text-center"><b className="font-serif text-3xl">{value}</b><small className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#8fbd91]">Impact score</small></div></div>; }

function OrbitalLeaf({ isDark }) {
  const outerOrbit = useRef(null);
  const innerOrbit = useRef(null);
  const leafIcon = useRef(null);
  const orbitContainer = useRef(null);

  useGSAP(() => {
    // Outer orbit - clockwise rotation
    gsap.to(outerOrbit.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Inner orbit - counterclockwise rotation
    gsap.to(innerOrbit.current, {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // Floating leaf animation (up and down)
    gsap.to(leafIcon.current, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Hover effects
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(orbitContainer.current, {
      scale: 1.08,
      duration: 0.6,
      ease: "power3.out",
    }, 0);
    hoverTl.to([outerOrbit.current, innerOrbit.current], {
      filter: "drop-shadow(0 0 12px rgba(143, 189, 145, 0.4))",
      duration: 0.6,
      ease: "power3.out",
    }, 0);

    orbitContainer.current?.addEventListener("mouseenter", () => hoverTl.play());
    orbitContainer.current?.addEventListener("mouseleave", () => hoverTl.reverse());

    return () => {
      orbitContainer.current?.removeEventListener("mouseenter", () => hoverTl.play());
      orbitContainer.current?.removeEventListener("mouseleave", () => hoverTl.reverse());
    };
  });

  const orbitColor = isDark ? "#8fbd91" : "#4a8f5e";
  const dotColor = isDark ? "#d89a68" : "#c4844a";

  return (
    <div ref={orbitContainer} className="relative flex items-center justify-center h-96 w-96 cursor-pointer">
      {/* Glow background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8fbd91]/20 via-transparent to-[#d89a68]/20 filter blur-2xl" />

      {/* Outer orbit ring */}
      <svg
        ref={outerOrbit}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke={orbitColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.4"
        />
        {/* Glowing dot on outer orbit - clockwise */}
        <g>
          <circle cx="200" cy="20" r="3" fill={dotColor} opacity="0.8" filter="url(#glow)" />
        </g>
      </svg>

      {/* Inner orbit ring */}
      <svg
        ref={innerOrbit}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke={orbitColor}
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.5"
        />
        {/* Glowing dot on inner orbit - counterclockwise */}
        <g>
          <circle cx="200" cy="80" r="2.5" fill={dotColor} opacity="0.9" filter="url(#glow)" />
        </g>
      </svg>

      {/* Center leaf icon */}
      <div
        ref={leafIcon}
        className="absolute text-[#8fbd91] filter drop-shadow-lg"
        style={{ fontSize: "52px" }}
      >
        <Leaf size={48} />
      </div>
    </div>
  );
}

export default function EnvironmentalCalculator() {
  const root = useRef(null);
  const expandedPanel = useRef(null);
  const headerRef = useRef(null);
  const backButtonRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [palm, setPalm] = useState(PALMS[0]);
  const [trees, setTrees] = useState(24);
  const [years, setYears] = useState(10);
  const [override, setOverride] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useGSAP(
    () => {
      if (!backButtonRef.current) return;
      const hoverTl = gsap.timeline({ paused: true });
      const play = () => hoverTl.play();
      const reverse = () => hoverTl.reverse();

      hoverTl.to(backButtonRef.current, {
        x: 6,
        scale: 1.03,
        duration: 0.22,
        ease: "power2.out",
      });
      hoverTl.to(
        backButtonRef.current,
        {
          boxShadow: "0 14px 30px rgba(143, 189, 145, 0.22)",
          duration: 0.22,
          ease: "power2.out",
        },
        0
      );

      backButtonRef.current.addEventListener("mouseenter", play);
      backButtonRef.current.addEventListener("mouseleave", reverse);

      return () => {
        backButtonRef.current?.removeEventListener("mouseenter", play);
        backButtonRef.current?.removeEventListener("mouseleave", reverse);
      };
    },
    { scope: root }
  );

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark]);

  const recommended = Math.round(trees * palm.spacing ** 2);
  const area = Number(override) || recommended;

  const results = useMemo(() => {
    const shade = Math.round(trees * palm.shade);
    const annualWater = trees * palm.water;
    const carbon = Math.round(trees * palm.carbon * years);
    const shadePercent = Math.min(100, Math.round((shade / Math.max(area, 1)) * 100));
    const saving = Math.round(annualWater * 0.18 * years);
    const score = Math.round(
      Math.min(
        100,
        shadePercent * 0.4 + Math.min(carbon / 80, 40) + Math.min(saving / 200, 20)
      )
    );
    return {
      shade,
      annualWater,
      carbon,
      shadePercent,
      saving,
      score,
      cooling: Math.round(shade * 0.7),
    };
  }, [trees, palm, years, area]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".calc-header", { y: -18, opacity: 0, duration: 0.5 })
        .from(".calc-hero, .calculator-panel", { y: 28, opacity: 0, duration: 0.65, stagger: 0.12 }, "-=0.25")
        .from(".metric", { y: 16, opacity: 0, duration: 0.4, stagger: 0.07 }, "-=0.3")
        .from(".orbital-leaf", { scale: 0, opacity: 0, duration: 0.7, ease: "back.out" }, "-=0.5");
    },
    { scope: root }
  );

  const toggle = () => {
    if (!expanded) {
      setExpanded(true);
      requestAnimationFrame(() => {
        gsap.fromTo(
          expandedPanel.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.8, ease: "power3.inOut" }
        );
      });
    } else {
      gsap.to(expandedPanel.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        onComplete: () => setExpanded(false),
      });
    }
  };

  const metrics = [
    {
      title: "Number of Palms",
      value: trees,
      unit: "palms",
      description: "Planned palms in this landscape",
      progress: Math.min(100, trees / 1.2),
    },
    {
      title: "Shade Coverage",
      value: results.shade,
      unit: "m²",
      description: `${results.shadePercent}% of the recommended project area`,
      progress: results.shadePercent,
    },
    {
      title: "CO₂ Absorption",
      value: results.carbon,
      unit: "kg",
      description: `Estimated over your ${years}-year horizon`,
      progress: Math.min(100, results.carbon / 100),
    },
    {
      title: "Annual Irrigation Estimate",
      value: results.annualWater,
      unit: "L / year",
      description: `${results.saving.toLocaleString()} L saved over the full horizon`,
      progress: Math.min(100, results.annualWater / 50),
    },
    {
      title: "Estimated Cooling Effect",
      value: results.cooling,
      unit: "m² shade",
      description: "A planning estimate for cooler outdoor space",
      progress: Math.min(100, results.cooling / 2),
    },
  ];

  const aiRecommendations = [
    {
      title: "Spacing Optimization",
      content:
        results.shadePercent > 80
          ? `Excellent density! Your ${palm.name} palms are optimally spaced.`
          : `Consider adjusting spacing to achieve better coverage across your ${area}m² area.`,
      icon: "📊",
    },
    {
      title: "Water Efficiency",
      content:
        results.annualWater < 3000
          ? `Your irrigation needs are within sustainable limits. Focus on efficient drip systems.`
          : `Large water requirements detected. Implement mulching and soil moisture monitoring.`,
      icon: "💧",
    },
    {
      title: "Carbon Impact",
      content:
        results.carbon > 2000
          ? `Strong carbon sequestration potential! This project significantly offsets emissions.`
          : `Extend your planning horizon or add more palms to maximize carbon benefits.`,
      icon: "🌍",
    },
    {
      title: "Climate Resilience",
      content: `${palm.name} palms offer excellent heat stress tolerance. Monitor seasonal irrigation adjustments.`,
      icon: "🌡️",
    },
  ];

  const dashboardPlan = useMemo(() => {
    const state = location.state || {};
    return {
      selectedPalm: state.selectedPalm || palm,
      trees: state.trees || trees,
      area: state.area || area,
      years: state.years || years,
      results: state.results || {
        shade: results.shade,
        annualWater: results.annualWater,
        carbon: results.carbon,
        environmentalScore: results.score,
      },
    };
  }, [location.state, palm, trees, area, years, results]);

  const bgClass = isDark ? "bg-[#101713]" : "bg-[#f5f0e5]";
  const textClass = isDark ? "text-[#f5f0e5]" : "text-[#1a1a1a]";
  const cardBgClass = isDark ? "bg-white/[.035]" : "bg-black/[.05]";
  const borderClass = isDark ? "border-white/10" : "border-black/10";
  const secondaryTextClass = isDark ? "text-white/50" : "text-black/50";

  return (
    <div
      ref={root}
      className={`min-h-screen overflow-x-hidden ${bgClass} ${textClass} transition-colors duration-500`}
    >
      {/* Background gradient glow */}
      <div
        className={`pointer-events-none fixed inset-0 ${
          isDark
            ? "bg-[radial-gradient(circle_at_15%_10%,rgba(71,120,90,.2),transparent_34%),radial-gradient(circle_at_90%_55%,rgba(217,154,107,.1),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_15%_10%,rgba(71,120,90,.08),transparent_34%),radial-gradient(circle_at_90%_55%,rgba(217,154,107,.05),transparent_28%)]"
        }`}
      />

      {/* Header with theme toggle */}
      <header
        ref={headerRef}
        className={`calc-header relative z-10 border-b ${borderClass}`}
      >
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              ref={backButtonRef}
              type="button"
              onClick={() => navigate(-1)}
              className={`inline-flex items-center gap-2 rounded-full border ${borderClass} bg-white/5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8fbd91] shadow-[0_12px_28px_rgba(12,18,13,0.12)] transition-all duration-300 hover:bg-[#8fbd91]/10`}
              aria-label="Go back to previous page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <span className={`grid h-10 w-10 place-items-center rounded-xl bg-[#8fbd91] text-[#102019]`}>
              <Leaf />
            </span>
            <span>
              <strong className="font-serif text-xl">Nakheel</strong>
              <small className={`block text-[8px] font-bold tracking-[.18em] ${secondaryTextClass}`}>
                PALM CARE & URBAN GREENING
              </small>
            </span>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className={`flex items-center gap-2 rounded-full ${borderClass} border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] transition-all hover:bg-white/5`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun /> : <Moon />}
            <span className={secondaryTextClass}>{isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-[1280px] px-5 pb-20 sm:px-8">
        {/* Hero section */}
        <section className="calc-hero py-14 sm:py-20">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[#d89a68]">
            <span className={`h-px w-8 bg-[#d89a68]`} /> Environmental impact calculator
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[.98] sm:text-7xl">
            Shape a cooler, <span className="text-[#d89a68]">greener</span> place.
          </h1>
          <p className={`mt-6 max-w-xl text-base leading-7 ${secondaryTextClass}`}>
            Build your planting plan and see its environmental value respond as you make decisions.
          </p>
        </section>

        {/* Orbital leaf hero illustration */}
        <div className="orbital-leaf mb-12 flex justify-center">
          <OrbitalLeaf isDark={isDark} />
        </div>

        {/* Main calculator panel */}
        <section
          className={`calculator-panel overflow-hidden rounded-[28px] border ${borderClass} ${cardBgClass} shadow-[0_35px_100px_rgba(0,0,0,.3)]`}
        >
          <div className="grid lg:grid-cols-2">
            {/* Left column: Setup controls */}
            <div className={`border-b ${borderClass} p-6 sm:p-10 lg:border-b-0 lg:border-r`}>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#8fbd91]">
                01 / Project setup
              </p>
              <h2 className="mb-8 font-serif text-4xl leading-none">
                Build your<br />planting plan.
              </h2>

              <div className="mb-8">
                <div className="mb-3 flex justify-between">
                  <label className="text-sm font-bold">Palm variety</label>
                  <span className={`text-[11px] ${secondaryTextClass}`}>Select one</span>
                </div>
                <div className="space-y-2">
                  {PALMS.map((choice) => (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => {
                        setPalm(choice);
                        setOverride("");
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border p-3 text-left transition-all ${
                        palm.id === choice.id
                          ? isDark
                            ? "border-[#d89a68]/70 bg-[#d89a68]/10"
                            : "border-[#d89a68]/50 bg-[#d89a68]/15"
                          : isDark
                          ? "border-white/10 bg-white/[.025] hover:bg-white/[.07]"
                          : "border-black/10 bg-black/[.025] hover:bg-black/[.07]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`grid h-10 w-10 place-items-center rounded-xl ${isDark ? "bg-white/10" : "bg-black/10"} text-[#8fbd91]`}>
                          <Leaf size={19} />
                        </span>
                        <span>
                          <b className="block text-sm">{choice.name}</b>
                          <i className={`block text-[11px] ${secondaryTextClass}`}>{choice.scientific}</i>
                        </span>
                      </span>
                      <Arrow />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <Slider
                  label="Number of palms"
                  value={trees}
                  min={1}
                  max={120}
                  unit=" palms"
                  onChange={setTrees}
                />
                <Slider
                  label="Planning horizon"
                  value={years}
                  min={1}
                  max={30}
                  unit=" years"
                  onChange={setYears}
                />
              </div>

              <div className={`mt-8 rounded-2xl border ${borderClass} ${isDark ? "bg-black/10" : "bg-black/5"} p-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <label htmlFor="area" className="text-sm font-bold">
                      Auto recommended area
                    </label>
                    <p className={`mt-1 text-xs leading-5 ${secondaryTextClass}`}>
                      Based on {palm.name} spacing of {palm.spacing}m × {palm.spacing}m.
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] ${
                      area >= recommended
                        ? "bg-[#8fbd91]/15 text-[#8fbd91]"
                        : "bg-[#d89a68]/15 text-[#d89a68]"
                    }`}
                  >
                    {area >= recommended ? "Good density" : "Review spacing"}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <input
                    id="area"
                    type="number"
                    min="50"
                    max="3000"
                    value={area}
                    onChange={(e) => setOverride(e.target.value)}
                    className={`w-full rounded-xl border ${borderClass} ${isDark ? "bg-white/[.06]" : "bg-black/[.06]"} px-3 py-3 text-lg font-bold outline-none focus:border-[#8fbd91]`}
                  />
                  <span className={`text-xs font-bold ${secondaryTextClass}`}>m²</span>
                </div>
                <p
                  className={`mt-2 text-[11px] ${
                    area >= recommended ? "text-[#8fbd91]/75" : "text-[#d89a68]/80"
                  }`}
                >
                  {override && area < recommended
                    ? `Consider at least ${recommended.toLocaleString()} m² for this planting density.`
                    : `Recommended footprint: ${recommended.toLocaleString()} m².`}
                </p>
              </div>
            </div>

            {/* Right column: Live preview */}
            <div className="p-6 sm:p-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                    02 / Live preview
                  </p>
                  <h2 className="font-serif text-4xl leading-none">
                    See your impact,<br />as you plan.
                  </h2>
                </div>
                <span className={`hidden rounded-full ${isDark ? "bg-[#8fbd91]/10" : "bg-[#8fbd91]/15"} px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#8fbd91] sm:block`}>
                  Live estimate
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.map((item, index) => (
                  <Metric key={item.title} item={item} wide={index === 2} />
                ))}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_155px]">
                <div className={`rounded-[22px] border ${borderClass} ${cardBgClass} p-5`}>
                  <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8fbd91]">
                    <Leaf size={16} /> Selected palm
                  </p>
                  <h3 className="font-serif text-2xl">{palm.name}</h3>
                  <p className={`mt-1 text-xs italic ${secondaryTextClass}`}>{palm.scientific}</p>
                  <p className={`mt-3 text-xs leading-5 ${secondaryTextClass}`}>
                    Spacing: {palm.spacing}m × {palm.spacing}m
                  </p>
                </div>
                <div className={`rounded-[22px] border ${borderClass} ${cardBgClass} p-3`}>
                  <Score value={results.score} />
                </div>
              </div>

              <div className={`mt-3 rounded-[22px] border ${borderClass} ${isDark ? "bg-black/10" : "bg-black/5"} p-5`}>
                <p className="text-sm font-bold">Generated summary</p>
                <p className={`mt-2 text-sm leading-6 ${secondaryTextClass}`}>
                  Your {trees} {palm.name} palms can provide approximately {results.shade.toLocaleString()} m² of
                  shade and absorb around {results.carbon.toLocaleString()} kg of CO₂ over {years} years.
                </p>
              </div>

              <button
                type="button"
                onClick={toggle}
                className="mt-4 flex w-full items-center justify-between rounded-xl bg-[#8fbd91] px-5 py-4 text-left text-sm font-bold text-[#102019] transition-all hover:bg-[#a5cca7]"
              >
                {expanded ? "Close project preview" : "Continue to project preview"}
                <Arrow />
              </button>

              <p className={`mt-4 text-[10px] leading-5 ${isDark ? "text-white/25" : "text-black/25"}`}>
                Illustrative planning figures. Actual outcomes vary with climate, soil, irrigation, palm age and
                maintenance.
              </p>
            </div>
          </div>

          {/* Expanded project preview section */}
          <div
            ref={expandedPanel}
            className={`${expanded ? "overflow-hidden border-t" : "hidden"} ${borderClass} ${isDark ? "bg-[#16231b]" : "bg-[#f0e8dc]"}`}
          >
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-12">
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                  03 / Project preview
                </p>
                <h2 className="font-serif text-4xl">Your project, in focus.</h2>
                <span className="mt-3 inline-block rounded-full bg-[#8fbd91]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#8fbd91]">
                  Live estimate
                </span>
                <p className={`mt-4 max-w-md text-sm leading-6 ${secondaryTextClass}`}>
                  A {area.toLocaleString()} m² landscape with {trees} {palm.name} palms, planned across a {years}-year
                  horizon.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between text-xs">
                  <b className={isDark ? "text-white/75" : "text-black/75"}>Environmental value</b>
                  <b className="text-[#8fbd91]">{results.score}% ready</b>
                </div>
                <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`}>
                  <div
                    className="h-full rounded-full bg-[#8fbd91]"
                    style={{ width: `${results.score}%` }}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className={`rounded-xl border ${borderClass} p-4`}>
                    <p className={`text-[10px] uppercase tracking-[.13em] ${secondaryTextClass}`}>Project details</p>
                    <p className="mt-2 text-sm font-bold">
                      {palm.name} / {trees} palms
                    </p>
                    <p className={`mt-1 text-xs ${secondaryTextClass}`}>
                      {area.toLocaleString()} m² · {years} years
                    </p>
                  </div>
                  <div className={`rounded-xl border ${borderClass} p-4`}>
                    <p className={`text-[10px] uppercase tracking-[.13em] ${secondaryTextClass}`}>
                      Environmental value
                    </p>
                    <p className="mt-2 text-sm font-bold">{results.carbon.toLocaleString()} kg CO₂</p>
                    <p className={`mt-1 text-xs ${secondaryTextClass}`}>
                      {results.shade.toLocaleString()} m² shade coverage
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                03 / Project dashboard
              </p>
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <section className={`rounded-[28px] border ${borderClass} ${cardBgClass} p-7`}>
                  <div className="mb-7 text-xs font-bold uppercase tracking-[0.18em] text-[#47785A]">Project details</div>
                  <div className="mb-8 flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#82B58C]/20 text-[#47785A]"><LeafMark /></div>
                    <div>
                      <div className="font-serif text-3xl">{dashboardPlan.selectedPalm.name}</div>
                      <div className="text-xs italic text-[#183326]/45">{dashboardPlan.selectedPalm.scientific}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-[#F7F2E8] p-4"><div className="text-2xl font-serif">{dashboardPlan.trees}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-[#183326]/45">Palms</div></div>
                    <div className="rounded-2xl bg-[#F7F2E8] p-4"><div className="text-2xl font-serif">{dashboardPlan.area}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-[#183326]/45">m² area</div></div>
                    <div className="rounded-2xl bg-[#F7F2E8] p-4"><div className="text-2xl font-serif">{dashboardPlan.years}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-[#183326]/45">Years</div></div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[#183326]/10 bg-[#183326] p-7 text-[#F5F0E5] shadow-[0_24px_70px_rgba(36,60,45,.16)]">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#D99A6B]">Environmental value</div>
                    <div className="rounded-full bg-[#82B58C]/20 px-3 py-1 text-[10px] font-bold text-[#82B58C]">Live estimate</div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div><div className="text-4xl font-serif">{dashboardPlan.results.shade.toLocaleString()}</div><div className="mt-1 text-xs text-white/50">m² shade</div></div>
                    <div><div className="text-4xl font-serif">{dashboardPlan.results.annualWater.toLocaleString()}</div><div className="mt-1 text-xs text-white/50">L / year</div></div>
                    <div><div className="text-4xl font-serif">{dashboardPlan.results.carbon.toLocaleString()}</div><div className="mt-1 text-xs text-white/50">kg CO₂</div></div>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between text-sm"><span className="text-white/55">Environmental impact score</span><strong className="text-[#82B58C]">{dashboardPlan.results.environmentalScore}/100</strong></div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#82B58C]" style={{ width: `${dashboardPlan.results.environmentalScore}%` }} /></div>
                  </div>
                </section>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                04 / Environmental metrics
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${secondaryTextClass}`}>
                    Shade Coverage
                  </p>
                  <p className="mt-3 font-serif text-2xl">{results.shade.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>m² of shade</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${secondaryTextClass}`}>
                    Carbon Sequestration
                  </p>
                  <p className="mt-3 font-serif text-2xl">{results.carbon.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>kg over {years} years</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${secondaryTextClass}`}>
                    Cooling Effect
                  </p>
                  <p className="mt-3 font-serif text-2xl">{results.cooling.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>estimated m²</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${secondaryTextClass}`}>
                    Annual Water
                  </p>
                  <p className="mt-3 font-serif text-2xl">{(results.annualWater / 1000).toFixed(1)}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>K liters/year</p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                05 / AI recommendations
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {aiRecommendations.map((rec, idx) => (
                  <div key={idx} className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                    <div className="mb-3 flex items-start justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8fbd91]">
                        {rec.title}
                      </p>
                      <span className="text-xl">{rec.icon}</span>
                    </div>
                    <p className={`text-sm leading-5 ${secondaryTextClass}`}>{rec.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
