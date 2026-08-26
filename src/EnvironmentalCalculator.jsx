import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PALMS = [
  {
    id: "barhee",
    name: "Barhee",
    scientific: "Phoenix dactylifera",
    description:
      "A balanced date palm variety for productive urban landscapes.",
    shade: 5.5,
    water: 180,
    carbon: 22,
  },
  {
    id: "khadrawy",
    name: "Khadrawy",
    scientific: "Phoenix dactylifera",
    description:
      "A resilient variety where shade and moderate water demand matter.",
    shade: 5.1,
    water: 155,
    carbon: 20,
  },
  {
    id: "zahdi",
    name: "Zahidi",
    scientific: "Phoenix dactylifera",
    description:
      "A robust traditional variety for warm urban environments.",
    shade: 4.8,
    water: 145,
    carbon: 19,
  },
];

function LeafIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.8 3.2C13.2 3.4 6.4 6.1 4 11.3c-1.5 3.2.1 6.5 3.5 7.1 3.5.7 7.3-1.6 9.3-4.5 2.1-3.1 2.9-7.2 4-10.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 21c3.2-6.1 7.1-9.2 12.4-11.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon({ size = 21 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ size = 21 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20.3 14.2A8.6 8.6 0 0 1 9.8 3.7 8.7 8.7 0 1 0 20.3 14.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShadeIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WaterIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3.5S6.5 10 6.5 14.3a5.5 5.5 0 0 0 11 0C17.5 10 12 3.5 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9.2 15.1c.3 1.2 1.1 2 2.4 2.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CarbonIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.2 18h9.6a4.2 4.2 0 0 0 .6-8.36A5.8 5.8 0 0 0 6.3 8.3 4.9 4.9 0 0 0 7.2 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M9 14c1.1-1.4 2.5-2.3 4.5-2.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SliderControl({
  label,
  value,
  min,
  max,
  unit,
  onChange,
  dark,
}) {
  return (
    <div className="mb-7">
      <div className="mb-3 flex items-center justify-between gap-4">
        <label className="text-sm font-semibold">{label}</label>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
            dark
              ? "bg-white/10 text-white/75"
              : "bg-[#183326]/[0.06] text-[#183326]/70"
          }`}
        >
          {value}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[#D8E3D9] accent-[#47785A] dark:bg-white/10"
      />

      <div
        className={`mt-2 flex justify-between text-[10px] ${
          dark ? "text-white/30" : "text-[#183326]/30"
        }`}
      >
        <span>
          {min}
          {unit}
        </span>

        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  title,
  value,
  unit,
  description,
  progress,
  dark,
  accent,
  fullWidth = false,
}) {
  const iconClasses = {
    green: dark
      ? "bg-[#82B58C]/10 text-[#82B58C]"
      : "bg-[#82B58C]/15 text-[#47785A]",

    blue: dark
      ? "bg-[#A9CFD5]/10 text-[#A9CFD5]"
      : "bg-[#E1F0F2] text-[#527D83]",

    peach: dark
      ? "bg-[#D99A6B]/10 text-[#D99A6B]"
      : "bg-[#F7E2D4] text-[#A36E48]",
  };

  const barClasses = {
    green: "bg-[#82B58C]",
    blue: "bg-[#A9CFD5]",
    peach: "bg-[#D99A6B]",
  };

  return (
    <div
      className={`result-card rounded-[26px] border p-6 transition-all duration-300 hover:-translate-y-1 ${
        fullWidth ? "sm:col-span-2" : ""
      } ${
        dark
          ? "border-white/10 bg-white/[0.035] hover:bg-white/[0.05]"
          : "border-[#183326]/10 bg-white/65 hover:bg-white/85"
      }`}
    >
      <div className="mb-5 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconClasses[accent]}`}
        >
          {icon}
        </div>

        <span
          className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
            dark ? "text-white/30" : "text-[#183326]/35"
          }`}
        >
          Live
        </span>
      </div>

      <p
        className={`text-xs font-semibold ${
          dark ? "text-white/50" : "text-[#183326]/50"
        }`}
      >
        {title}
      </p>

      <div className="mt-1 flex items-end gap-2">
        <span className="font-serif text-[42px] leading-none tracking-[-0.045em]">
          {value.toLocaleString()}
        </span>

        <span
          className={`mb-1 text-xs font-bold ${
            dark ? "text-white/35" : "text-[#183326]/40"
          }`}
        >
          {unit}
        </span>
      </div>

      <p
        className={`mt-3 min-h-[40px] text-xs leading-5 ${
          dark ? "text-white/40" : "text-[#183326]/45"
        }`}
      >
        {description}
      </p>

      <div
        className={`mt-5 h-1.5 overflow-hidden rounded-full ${
          dark ? "bg-white/10" : "bg-[#183326]/10"
        }`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ${barClasses[accent]}`}
          style={{
            width: `${Math.max(
              5,
              Math.min(progress, 100)
            )}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function EnvironmentalCalculator() {
  const container = useRef(null);

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("nakheel-theme") === "dark";
  });

  const [selectedPalm, setSelectedPalm] = useState(PALMS[0]);
  const [trees, setTrees] = useState(24);
  const [area, setArea] = useState(420);
  const [years, setYears] = useState(10);

  const results = useMemo(() => {
    const shade = trees * selectedPalm.shade;

    const annualWater = trees * selectedPalm.water;

    const carbon =
      trees * selectedPalm.carbon * years;

    const shadePercent = Math.min(
      100,
      Math.round((shade / Math.max(area, 1)) * 100)
    );

    const estimatedWaterSaving = Math.round(
      annualWater * 0.18 * years
    );

    return {
      shade: Math.round(shade),
      shadePercent,
      annualWater,
      estimatedWaterSaving,
      carbon: Math.round(carbon),
    };
  }, [trees, area, years, selectedPalm]);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      timeline
        .from(".calculator-nav", {
          y: -20,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-label",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        )
        .from(
          ".hero-line",
          {
            y: 70,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          "-=0.25"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".calculator-panel",
          {
            y: 45,
            opacity: 0,
            scale: 0.98,
            duration: 0.9,
          },
          "-=0.35"
        )
        .from(
          ".result-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
          },
          "-=0.35"
        );

      gsap.to(".orbit-one", {
        rotate: 360,
        duration: 35,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".orbit-two", {
        rotate: -360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".floating-leaf", {
        y: -14,
        rotate: 6,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: container,
    }
  );

  function toggleTheme() {
    const nextTheme = !dark;

    setDark(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme
    );

    localStorage.setItem(
      "nakheel-theme",
      nextTheme ? "dark" : "light"
    );
  }

  return (
    <div
      ref={container}
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${
        dark
          ? "bg-[#101713] text-[#F5F0E5]"
          : "bg-[#F5F0E5] text-[#183326]"
      }`}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={`absolute -left-48 top-20 h-[520px] w-[520px] rounded-full blur-[140px] ${
            dark
              ? "bg-[#47785A]/15"
              : "bg-[#82B58C]/20"
          }`}
        />

        <div
          className={`absolute -right-48 top-[42%] h-[550px] w-[550px] rounded-full blur-[150px] ${
            dark
              ? "bg-[#D99A6B]/10"
              : "bg-[#D99A6B]/15"
          }`}
        />
      </div>

      {/* NAVBAR */}
      <header
        className={`calculator-nav relative z-20 border-b ${
          dark
            ? "border-white/10"
            : "border-[#183326]/10"
        }`}
      >
        <div className="mx-auto flex h-[86px] max-w-[1380px] items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#82B58C] text-white shadow-lg shadow-[#47785A]/20">
              <LeafIcon size={26} />
            </div>

            <div>
              <div className="font-serif text-[22px] font-bold tracking-[-0.02em]">
                Nakheel
              </div>

              <div
                className={`text-[9px] font-bold tracking-[0.13em] ${
                  dark
                    ? "text-white/40"
                    : "text-[#183326]/45"
                }`}
              >
                PALM CARE & URBAN GREENING
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#calculator"
              className={`hidden text-sm font-semibold transition-colors hover:text-[#D99A6B] md:block ${
                dark
                  ? "text-white/65"
                  : "text-[#183326]/65"
              }`}
            >
              Calculator
            </a>

            <a
              href="#impact"
              className={`hidden text-sm font-semibold transition-colors hover:text-[#D99A6B] md:block ${
                dark
                  ? "text-white/65"
                  : "text-[#183326]/65"
              }`}
            >
              Impact
            </a>

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-105 ${
                dark
                  ? "border-white/10 bg-white/[0.04] text-[#F2D4A3]"
                  : "border-[#183326]/10 bg-white/60 text-[#A36E48]"
              }`}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-[1380px] px-6 pb-12 pt-16 lg:px-10 lg:pb-20 lg:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_.8fr]">
            <div>
              <div className="hero-label mb-6 flex items-center gap-3">
                <span className="h-px w-10 bg-[#D99A6B]" />

                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D99A6B]">
                  Environmental Impact Calculator
                </span>
              </div>

              <div className="overflow-hidden">
                <h1 className="font-serif text-[clamp(48px,6vw,82px)] leading-[0.94] tracking-[-0.05em]">
                  <span className="hero-line block">
                    Plan your
                  </span>

                  <span className="hero-line block text-[#D99A6B]">
                    greener future.
                  </span>
                </h1>
              </div>

              <p
                className={`hero-description mt-7 max-w-[650px] text-[17px] leading-8 ${
                  dark
                    ? "text-white/55"
                    : "text-[#183326]/60"
                }`}
              >
                Design your urban planting project and
                instantly explore its potential benefits for
                shade, water and carbon absorption.
              </p>

              <div className="hero-description mt-7 flex flex-wrap gap-3">
                <span
                  className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                    dark
                      ? "border-white/10 bg-white/[0.04] text-white/55"
                      : "border-[#183326]/10 bg-white/60 text-[#183326]/60"
                  }`}
                >
                  Live calculations
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                    dark
                      ? "border-white/10 bg-white/[0.04] text-white/55"
                      : "border-[#183326]/10 bg-white/60 text-[#183326]/60"
                  }`}
                >
                  Urban planting
                </span>

                <span
                  className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                    dark
                      ? "border-white/10 bg-white/[0.04] text-white/55"
                      : "border-[#183326]/10 bg-white/60 text-[#183326]/60"
                  }`}
                >
                  Environmental estimate
                </span>
              </div>
            </div>

            {/* ORBIT */}
            <div className="relative hidden h-[390px] lg:block">
              <div className="orbit-one absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#82B58C]/30" />

              <div className="orbit-two absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D99A6B]/30" />

              <div className="absolute left-[14%] top-[22%] h-3 w-3 rounded-full bg-[#82B58C] shadow-[0_0_20px_#82B58C]" />

              <div className="absolute right-[15%] top-[36%] h-3 w-3 rounded-full bg-[#D99A6B] shadow-[0_0_20px_#D99A6B]" />

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className={`absolute inset-0 scale-150 rounded-full blur-3xl ${
                    dark
                      ? "bg-[#82B58C]/10"
                      : "bg-[#82B58C]/20"
                  }`}
                />

                <div className="floating-leaf relative text-[#82B58C]">
                  <LeafIcon size={105} />
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-5 py-2 text-[11px] backdrop-blur-xl ${
                  dark
                    ? "border-white/10 bg-white/[0.04] text-white/50"
                    : "border-[#183326]/10 bg-white/60 text-[#183326]/55"
                }`}
              >
                Measure the impact of your landscape
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section
          id="calculator"
          className="mx-auto max-w-[1380px] scroll-mt-10 px-6 pb-24 lg:px-10"
        >
          <div
            className={`calculator-panel overflow-hidden rounded-[34px] border backdrop-blur-2xl ${
              dark
                ? "border-white/10 bg-white/[0.035] shadow-[0_40px_100px_rgba(0,0,0,.3)]"
                : "border-[#183326]/10 bg-white/70 shadow-[0_40px_100px_rgba(36,60,45,.12)]"
            }`}
          >
            <div className="grid lg:grid-cols-[.82fr_1.18fr]">
              {/* PROJECT SETUP */}
              <div
                className={`p-7 sm:p-10 lg:p-12 lg:border-r ${
                  dark
                    ? "border-white/10"
                    : "border-[#183326]/10"
                }`}
              >
                <div className="mb-9">
                  <div
                    className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${
                      dark
                        ? "text-[#82B58C]"
                        : "text-[#47785A]"
                    }`}
                  >
                    01 / Project setup
                  </div>

                  <h2 className="font-serif text-[40px] leading-[1] tracking-[-0.035em]">
                    Build your
                    <br />
                    planting plan.
                  </h2>
                </div>

                {/* PALM VARIETY */}
                <div className="mb-8">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-bold">
                      Palm variety
                    </label>

                    <span
                      className={`text-[11px] ${
                        dark
                          ? "text-white/35"
                          : "text-[#183326]/40"
                      }`}
                    >
                      Select one
                    </span>
                  </div>

                  <div className="space-y-2">
                    {PALMS.map((palm) => {
                      const active =
                        selectedPalm.id === palm.id;

                      return (
                        <button
                          key={palm.id}
                          onClick={() =>
                            setSelectedPalm(palm)
                          }
                          className={`group flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 ${
                            active
                              ? "border-[#D99A6B]/60 bg-[#D99A6B]/10"
                              : dark
                                ? "border-white/10 bg-white/[0.025] hover:bg-white/[0.06]"
                                : "border-[#183326]/10 bg-white/50 hover:bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                active
                                  ? "bg-[#82B58C] text-white"
                                  : dark
                                    ? "bg-white/[0.06] text-[#82B58C]"
                                    : "bg-[#E5EFE5] text-[#47785A]"
                              }`}
                            >
                              <LeafIcon size={21} />
                            </div>

                            <div>
                              <div className="text-sm font-bold">
                                {palm.name}
                              </div>

                              <div
                                className={`text-[11px] italic ${
                                  dark
                                    ? "text-white/30"
                                    : "text-[#183326]/35"
                                }`}
                              >
                                {palm.scientific}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`transition-transform duration-300 ${
                              active
                                ? "translate-x-1"
                                : "group-hover:translate-x-1"
                            }`}
                          >
                            <ArrowIcon />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <SliderControl
                  label="Number of palms"
                  value={trees}
                  min={1}
                  max={120}
                  unit=" palms"
                  onChange={setTrees}
                  dark={dark}
                />

                <SliderControl
                  label="Project area"
                  value={area}
                  min={50}
                  max={3000}
                  unit=" m²"
                  onChange={setArea}
                  dark={dark}
                />

                <SliderControl
                  label="Planning horizon"
                  value={years}
                  min={1}
                  max={30}
                  unit=" years"
                  onChange={setYears}
                  dark={dark}
                />
              </div>

              {/* RESULTS */}
              <div className="p-7 sm:p-10 lg:p-12">
                <div className="mb-9 flex items-end justify-between gap-5">
                  <div>
                    <div
                      className={`mb-2 text-xs font-bold uppercase tracking-[0.2em] ${
                        dark
                          ? "text-[#D99A6B]"
                          : "text-[#A36E48]"
                      }`}
                    >
                      02 / Environmental forecast
                    </div>

                    <h2 className="font-serif text-[40px] leading-[1] tracking-[-0.035em]">
                      Your impact,
                      <br />
                      at a glance.
                    </h2>
                  </div>

                  <span
                    className={`hidden rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] sm:block ${
                      dark
                        ? "bg-[#82B58C]/10 text-[#82B58C]"
                        : "bg-[#82B58C]/15 text-[#47785A]"
                    }`}
                  >
                    Live estimate
                  </span>
                </div>

                <div
                  id="impact"
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <ResultCard
                    icon={<ShadeIcon />}
                    title="Potential shade"
                    value={results.shade}
                    unit="m²"
                    description={`Approx. ${results.shadePercent}% of your project area`}
                    progress={results.shadePercent}
                    dark={dark}
                    accent="green"
                  />

                  <ResultCard
                    icon={<WaterIcon />}
                    title="Water footprint"
                    value={results.annualWater}
                    unit="L / year"
                    description={`${results.estimatedWaterSaving.toLocaleString()} L estimated saving over ${years} years`}
                    progress={Math.min(
                      95,
                      (results.estimatedWaterSaving /
                        300000) *
                        100
                    )}
                    dark={dark}
                    accent="blue"
                  />

                  <ResultCard
                    icon={<CarbonIcon />}
                    title="Carbon absorbed"
                    value={results.carbon}
                    unit="kg CO₂"
                    description={`Estimated environmental contribution over ${years} years`}
                    progress={Math.min(
                      95,
                      (results.carbon / 10000) * 100
                    )}
                    dark={dark}
                    accent="peach"
                    fullWidth
                  />
                </div>

                {/* SUMMARY */}
                <div
                  className={`mt-5 rounded-[24px] border p-6 ${
                    dark
                      ? "border-white/10 bg-black/10"
                      : "border-[#183326]/10 bg-[#F7F2E8]/70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <div className="mb-1 text-sm font-bold">
                        Your current plan
                      </div>

                      <p
                        className={`text-sm leading-6 ${
                          dark
                            ? "text-white/45"
                            : "text-[#183326]/50"
                        }`}
                      >
                        {trees} {selectedPalm.name} palms
                        across {area} m² for {years} years.
                      </p>
                    </div>

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#82B58C]/10 text-[#82B58C] sm:flex">
                      <LeafIcon size={22} />
                    </div>
                  </div>
                </div>

                <p
                  className={`mt-5 text-[10px] leading-5 ${
                    dark
                      ? "text-white/25"
                      : "text-[#183326]/30"
                  }`}
                >
                  Estimates are illustrative planning figures.
                  Actual environmental outcomes vary according
                  to climate, soil, irrigation, palm age and
                  maintenance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM STORY */}
        <section className="mx-auto max-w-[1380px] px-6 pb-24 lg:px-10">
          <div
            className={`relative overflow-hidden rounded-[34px] border px-7 py-12 sm:px-12 lg:px-16 lg:py-16 ${
              dark
                ? "border-white/10 bg-[#16231B]"
                : "border-[#183326]/10 bg-[#E6EEE2]"
            }`}
          >
            <div className="relative z-10 max-w-[700px]">
              <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#D99A6B]">
                More than numbers
              </div>

              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                Every palm becomes part of a larger urban
                ecosystem.
              </h2>

              <p
                className={`mt-6 text-base leading-8 ${
                  dark
                    ? "text-white/45"
                    : "text-[#183326]/55"
                }`}
              >
                Plan greener streets, cooler public spaces and
                landscapes that become more valuable with time.
              </p>
            </div>

            <div className="pointer-events-none absolute -right-24 -top-24 h-[390px] w-[390px] rounded-full border border-dashed border-[#82B58C]/30" />

            <div className="pointer-events-none absolute -right-2 -top-12 h-[290px] w-[290px] rounded-full border border-dashed border-[#D99A6B]/30" />

            <div className="pointer-events-none absolute right-24 top-24 text-[#82B58C]/40">
              <LeafIcon size={100} />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t ${
          dark
            ? "border-white/10"
            : "border-[#183326]/10"
        }`}
      >
        <div className="mx-auto flex max-w-[1380px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="flex items-center gap-2">
            <LeafIcon size={18} />
            <span className="text-sm font-bold">
              Nakheel
            </span>
          </div>

          <p
            className={`text-[10px] ${
              dark
                ? "text-white/30"
                : "text-[#183326]/35"
            }`}
          >
            Environmental Impact Calculator
          </p>
        </div>
      </footer>
    </div>
  );
}