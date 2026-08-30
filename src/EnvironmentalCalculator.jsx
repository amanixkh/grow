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

function Slider({ label, value, min, max, unit, onChange, isDark }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-3">
        <label className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#183326]"}`}>{label}</label>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${isDark ? "bg-white/10 text-white" : "bg-[#183326]/5 text-[#183326]/80"}`}>{value}{unit}</span>
      </div>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-[#8fbd91]"
        style={{ background: isDark ? "rgba(255,255,255,0.18)" : "rgba(24,51,38,0.10)" }}
      />
      <div className={`flex justify-between text-[10px] font-medium ${isDark ? "text-white/60" : "text-[#183326]/55"}`}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

function Metric({ item, wide, isDark }) {
  const number = useRef(null); const bar = useRef(null);
  useGSAP(() => { gsap.fromTo(number.current, { innerText: 0 }, { innerText: item.value, duration: .7, snap: { innerText: 1 }, ease: "power2.out" }); gsap.to(bar.current, { width: `${item.progress}%`, duration: .8, ease: "power3.out" }); }, { dependencies: [item.value, item.progress] });
  return (
    <article className={`metric rounded-[22px] border p-5 ${isDark ? "border-white/10 bg-white/[.045]" : "border-[#183326]/10 bg-[#f8f4ee]"} ${wide ? "sm:col-span-2" : ""}`}>
      <div className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-[#8fbd91]/15 text-[#8fbd91]"><Leaf size={20} /></div>
      <p className={`text-xs font-semibold ${isDark ? "text-white/70" : "text-[#183326]/70"}`}>{item.title}</p>
      <div className="mt-1 flex items-end gap-2">
        <strong ref={number} className={`font-serif text-[34px] leading-none ${isDark ? "text-white" : "text-[#183326]"}`}>{item.value}</strong>
        <span className={`mb-0.5 text-[10px] font-bold ${isDark ? "text-white/60" : "text-[#183326]/60"}`}>{item.unit}</span>
      </div>
      <p className={`mt-3 min-h-10 text-xs leading-5 ${isDark ? "text-white/70" : "text-[#183326]/70"}`}>{item.description}</p>
      <div className={`mt-4 h-1 overflow-hidden rounded-full ${isDark ? "bg-white/10" : "bg-[#183326]/10"}`}><div ref={bar} className="h-full w-0 rounded-full bg-[#8fbd91]" /></div>
    </article>
  );
}

function Score({ value, isDark }) { const ring = useRef(null); useGSAP(() => gsap.to(ring.current, { strokeDashoffset: 283 - 2.83 * value, duration: 1, ease: "power3.out" }), { dependencies: [value] }); return <div className="relative grid place-items-center"><svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="7" className={isDark ? "text-white/10" : "text-[#183326]/10"} /><circle ref={ring} cx="50" cy="50" r="45" fill="none" stroke="#8fbd91" strokeWidth="7" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="283" /></svg><div className="absolute text-center"><b className={`font-serif text-3xl ${isDark ? "text-white" : "text-[#183326]"}`}>{value}</b><small className="block text-[9px] font-bold uppercase tracking-[.14em] text-[#8fbd91]">Impact score</small></div></div>; }

function PremiumDecorativePalm({ isDark, palmName = "Date Palm" }) {
  const cardRef = useRef(null);
  const frondsRef = useRef(null);
  const particle1Ref = useRef(null);
  const particle2Ref = useRef(null);
  const particle3Ref = useRef(null);
  const leafFloatRef = useRef(null);
  const sunBeamRef = useRef(null);
  const shadowRef = useRef(null);
  const sceneRef = useRef(null);

  useGSAP(() => {
    // Gentle natural wind sway for palm canopy
    gsap.to(frondsRef.current, {
      rotation: 2.2,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 90%",
    });

    // Ground shadow breathing effect
    gsap.to(shadowRef.current, {
      scaleX: 1.08,
      opacity: 0.75,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "50% 50%",
    });

    // Slow floating nature particles
    gsap.to(particle1Ref.current, {
      y: -16,
      x: 8,
      opacity: 0.85,
      duration: 4.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(particle2Ref.current, {
      y: -22,
      x: -10,
      opacity: 0.9,
      duration: 5.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0.8,
    });

    gsap.to(particle3Ref.current, {
      y: -14,
      x: 12,
      opacity: 0.75,
      duration: 4.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.6,
    });

    // Floating stylized leaf
    gsap.to(leafFloatRef.current, {
      y: -12,
      rotation: 14,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Soft sunlight beam pulse
    gsap.to(sunBeamRef.current, {
      opacity: isDark ? 0.4 : 0.6,
      scale: 1.05,
      duration: 5.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "100% 0%",
    });

    // Smooth entrance fade-in
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
    );
  }, [isDark]);

  // Subtle 3D parallax on mouse movement
  const handleMouseMove = (e) => {
    if (!cardRef.current || !sceneRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(sceneRef.current, {
      x: xPos * 12,
      y: yPos * 8,
      rotationY: xPos * 4,
      rotationX: -yPos * 4,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!sceneRef.current) return;
    gsap.to(sceneRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative mt-8 overflow-hidden rounded-[26px] border transition-all duration-500 ${
        isDark
          ? "border-white/10 bg-[#14261e] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          : "border-[#183326]/10 bg-[#fbf8f2] shadow-[0_18px_45px_rgba(24,51,38,0.06)]"
      }`}
    >
      {/* Ambient Glows & Sunlight from Corner */}
      <div
        ref={sunBeamRef}
        className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(216,154,104,0.22),transparent_70%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(228,182,110,0.18),transparent_70%)]"
      />
      <div className="pointer-events-none absolute -left-12 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(143,189,145,0.25),transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(143,189,145,0.08),transparent_65%)]" />

      {/* Structured Card Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-inherit px-6 py-4 sm:px-7">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#8fbd91] shadow-[0_0_8px_rgba(143,189,145,0.8)]" />
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8fbd91]">
              {palmName} Canopy
            </h4>
          </div>
          <p className="mt-1 font-serif text-base sm:text-lg text-[var(--heading)]">
            Natural Microclimate & Canopy Resiliency
          </p>
        </div>
      </div>

      {/* Centered Hero SVG Canvas Illustration */}
      <div
        ref={sceneRef}
        className="relative flex h-[230px] w-full items-center justify-center sm:h-[260px] lg:h-[280px]"
      >
        <svg
          viewBox="0 0 520 400"
          className="h-full w-full select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Ground Lawn Gradient */}
            <linearGradient id="heroGroundGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8fbd91" stopOpacity="0" />
              <stop offset="30%" stopColor={isDark ? "#24493a" : "#c4e2c9"} stopOpacity={isDark ? 0.4 : 0.7} />
              <stop offset="50%" stopColor={isDark ? "#356852" : "#b1d6b8"} stopOpacity={isDark ? 0.6 : 0.9} />
              <stop offset="70%" stopColor={isDark ? "#24493a" : "#c4e2c9"} stopOpacity={isDark ? 0.4 : 0.7} />
              <stop offset="100%" stopColor="#8fbd91" stopOpacity="0" />
            </linearGradient>

            {/* Sunlight Fan Rays Gradient */}
            <linearGradient id="heroSunRays" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d89a68" stopOpacity={isDark ? "0.32" : "0.22"} />
              <stop offset="60%" stopColor="#8fbd91" stopOpacity={isDark ? "0.12" : "0.08"} />
              <stop offset="100%" stopColor="#8fbd91" stopOpacity="0" />
            </linearGradient>

            {/* Palm Frond Gradients */}
            <linearGradient id="heroFrondHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#85e2aa" />
              <stop offset="45%" stopColor="#43b272" />
              <stop offset="100%" stopColor="#1f7d46" />
            </linearGradient>

            <linearGradient id="heroFrondDeep" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e9059" />
              <stop offset="60%" stopColor="#196037" />
              <stop offset="100%" stopColor="#0d3f23" />
            </linearGradient>

            <linearGradient id="heroTrunkGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5c3e23" />
              <stop offset="40%" stopColor="#8f6137" />
              <stop offset="70%" stopColor="#a37242" />
              <stop offset="100%" stopColor="#4d3218" />
            </linearGradient>
          </defs>

          {/* Architectural Sunlight Fan Rays */}
          <g opacity="0.85">
            <polygon points="520,0 520,70 200,360 340,360" fill="url(#heroSunRays)" />
            <polygon points="520,0 450,0 120,360 220,360" fill="url(#heroSunRays)" />
            <polygon points="520,0 520,160 290,360 410,360" fill="url(#heroSunRays)" />
          </g>

          {/* Organic Minimal Contour Depth Rings */}
          <g fill="none" stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(24,51,38,0.08)"} strokeWidth="1">
            <ellipse cx="260" cy="355" rx="170" ry="36" strokeDasharray="5 7" />
            <ellipse cx="260" cy="355" rx="115" ry="24" strokeDasharray="4 5" />
          </g>

          {/* Ground Mound / Island Base */}
          <path
            d="M 50 365 Q 260 335 470 365 Q 260 385 50 365 Z"
            fill="url(#heroGroundGrad)"
          />

          {/* Ground Canopy Shadow */}
          <ellipse
            ref={shadowRef}
            cx="260"
            cy="360"
            rx="105"
            ry="22"
            fill="rgba(16, 43, 35, 0.28)"
            className="dark:fill-[rgba(0,0,0,0.55)]"
          />

          {/* Centered Hero Palm Trunk */}
          <g>
            <path
              d="M 252 358 Q 256 240 259 125 L 263 125 Q 266 240 270 358 Z"
              fill="url(#heroTrunkGrad)"
              stroke="#3a2412"
              strokeWidth="0.8"
            />
            {/* Trunk Ring Ridges */}
            <line x1="253.5" y1="335" x2="268.5" y2="335" stroke="#3a2412" strokeWidth="1.1" opacity="0.65" />
            <line x1="254.5" y1="305" x2="267.5" y2="305" stroke="#3a2412" strokeWidth="1.1" opacity="0.65" />
            <line x1="255.5" y1="275" x2="266.5" y2="275" stroke="#3a2412" strokeWidth="1.0" opacity="0.65" />
            <line x1="256.5" y1="245" x2="265.5" y2="245" stroke="#3a2412" strokeWidth="1.0" opacity="0.65" />
            <line x1="257.5" y1="215" x2="264.5" y2="215" stroke="#3a2412" strokeWidth="0.9" opacity="0.65" />
            <line x1="258.5" y1="185" x2="263.8" y2="185" stroke="#3a2412" strokeWidth="0.9" opacity="0.65" />
            <line x1="259.2" y1="155" x2="262.8" y2="155" stroke="#3a2412" strokeWidth="0.8" opacity="0.65" />
          </g>

          {/* Large Centered Canopy Fronds (Gentle Wind Sway) */}
          <g ref={frondsRef} transform="translate(261, 125)">
            {/* Golden Date Clusters */}
            <circle cx="-9" cy="9" r="6" fill="#d89a68" />
            <circle cx="9" cy="9" r="6" fill="#d89a68" />
            <circle cx="0" cy="13" r="5" fill="#c4844a" />

            {/* Back Deep Fronds (Layer 1 - Expansive reach) */}
            <path
              d="M 0 0 Q -95 -28 -135 18 Q -80 -5 0 0"
              fill="url(#heroFrondDeep)"
              stroke="#0e3d22"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q 95 -28 135 18 Q 80 -5 0 0"
              fill="url(#heroFrondDeep)"
              stroke="#0e3d22"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q -115 10 -155 60 Q -96 28 0 0"
              fill="url(#heroFrondDeep)"
              stroke="#0e3d22"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q 115 10 155 60 Q 96 28 0 0"
              fill="url(#heroFrondDeep)"
              stroke="#0e3d22"
              strokeWidth="0.8"
            />

            {/* Mid Arching Fronds (Layer 2 - High visual prominence) */}
            <path
              d="M 0 0 Q -70 -68 -108 -36 Q -52 -42 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q 70 -68 108 -36 Q 52 -42 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q -40 -92 -60 -100 Q -20 -55 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q 40 -92 60 -100 Q 22 -55 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />

            {/* Additional Upper Fill Fronds */}
            <path
              d="M 0 0 Q -86 -48 -126 -10 Q -64 -28 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />
            <path
              d="M 0 0 Q 86 -48 126 -10 Q 64 -28 0 0"
              fill="url(#heroFrondHighlight)"
              stroke="#14522d"
              strokeWidth="0.8"
            />

            {/* Crown Center Upright Frond */}
            <path
              d="M 0 0 Q -12 -84 0 -110 Q 12 -84 0 0"
              fill="#8ee6b1"
            />

            {/* Delicate Spine Rib Highlights */}
            <path d="M 0 0 Q -66 -60 -104 -32" fill="none" stroke="#bdf4d4" strokeWidth="1.2" />
            <path d="M 0 0 Q 66 -60 104 -32" fill="none" stroke="#bdf4d4" strokeWidth="1.2" />
            <path d="M 0 0 Q -92 -24 -131 14" fill="none" stroke="#a7deb1" strokeWidth="1.1" />
            <path d="M 0 0 Q 92 -24 131 14" fill="none" stroke="#a7deb1" strokeWidth="1.1" />
            <path d="M 0 0 Q -36 -84 -56 -94" fill="none" stroke="#d5fbe5" strokeWidth="1.2" />
            <path d="M 0 0 Q 36 -84 56 -94" fill="none" stroke="#d5fbe5" strokeWidth="1.2" />
            <path d="M 0 0 Q -82 -42 -122 -6" fill="none" stroke="#cbf8dd" strokeWidth="1.0" />
            <path d="M 0 0 Q 82 -42 122 -6" fill="none" stroke="#cbf8dd" strokeWidth="1.0" />
          </g>

          {/* Floating Leaves & Nature Particles for Depth */}
          <g>
            <circle ref={particle1Ref} cx="130" cy="140" r="3" fill="#8fbd91" opacity="0.65" />
            <circle ref={particle2Ref} cx="390" cy="110" r="2.6" fill="#d89a68" opacity="0.75" />
            <circle ref={particle3Ref} cx="420" cy="220" r="3.2" fill="#8fbd91" opacity="0.55" />
            <circle cx="160" cy="260" r="2" fill="#8fbd91" opacity="0.45" />
            <circle cx="360" cy="280" r="2" fill="#d89a68" opacity="0.45" />

            {/* Floating Stylized Leaf */}
            <g ref={leafFloatRef} transform="translate(145, 190)">
              <path
                d="M 0 0 C 8 -8 20 -5 22 5 C 14 14 3 12 0 0 Z"
                fill="#8fbd91"
                opacity={isDark ? "0.7" : "0.6"}
              />
              <line x1="2" y1="2" x2="20" y2="5" stroke="#1f6b43" strokeWidth="0.8" opacity="0.6" />
            </g>
          </g>
        </svg>
      </div>

      {/* Structured Card Footer */}
      <div className="flex items-center justify-between border-t border-inherit bg-[var(--surface-soft)]/60 px-6 py-3 text-[10px] font-semibold text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1F8A54]" />
          High Carbon Sequestration & Microclimate Cooling
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--faint)]">
          Sustainable Urban Greening
        </span>
      </div>
    </div>
  );
}

function OrbitalLeaf({ isDark }) {
  const outerOrbit = useRef(null);
  const innerOrbit = useRef(null);
  const leafIcon = useRef(null);
  const orbitContainer = useRef(null);

  useGSAP(() => {
    // Outer orbit — clockwise
    gsap.to(outerOrbit.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Inner orbit — counterclockwise
    gsap.to(innerOrbit.current, {
      rotation: -360,
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    // Floating leaf
    gsap.to(leafIcon.current, {
      y: -6,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Hover effect
    const hoverTl = gsap.timeline({ paused: true });

    hoverTl.to(
      orbitContainer.current,
      {
        scale: 1.06,
        duration: 0.5,
        ease: "power3.out",
      },
      0
    );

    hoverTl.to(
      [outerOrbit.current, innerOrbit.current],
      {
        filter: "drop-shadow(0 0 8px rgba(143, 189, 145, 0.4))",
        duration: 0.5,
      },
      0
    );

    const container = orbitContainer.current;
    const enter = () => hoverTl.play();
    const leave = () => hoverTl.reverse();

    container?.addEventListener("mouseenter", enter);
    container?.addEventListener("mouseleave", leave);

    return () => {
      container?.removeEventListener("mouseenter", enter);
      container?.removeEventListener("mouseleave", leave);
    };
  });

  const orbitColor = isDark ? "#8fbd91" : "#4a8f5e";
  const dotColor = isDark ? "#d89a68" : "#c4844a";

  return (
    <div
      ref={orbitContainer}
      className="relative flex h-[220px] w-[220px] items-center justify-center lg:h-[240px] lg:w-[240px]"
    >
      {/* Soft glow */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(143,189,145,0.15),transparent_70%)] blur-xl" />

      {/* Outer orbit */}
      <svg
        ref={outerOrbit}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
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

        <circle
          cx="200"
          cy="20"
          r="3"
          fill={dotColor}
          opacity="0.8"
        />
      </svg>

      {/* Inner orbit */}
      <svg
        ref={innerOrbit}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
      >
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

        <circle
          cx="200"
          cy="80"
          r="2.5"
          fill={dotColor}
          opacity="0.9"
        />
      </svg>

      {/* Center leaf */}
      <div
        ref={leafIcon}
        className="absolute text-[#8fbd91] drop-shadow-lg"
      >
        <Leaf size={34} />
      </div>
    </div>
  );
}
function ImpactTrendChart({ palm, trees, years, darkMode }) {
  const data = useMemo(() => {
    return Array.from({ length: years }, (_, i) => {
      const year = i + 1;
      return {
        year,
        carbon: Math.round(trees * palm.carbon * year),
        shade: Math.round(trees * palm.shade * Math.min(1, year / 5)),
      };
    });
  }, [palm.carbon, palm.shade, trees, years]);

  const maxCarbon = Math.max(...data.map((d) => d.carbon), 1);
  const finalCarbon = data[data.length - 1]?.carbon || 0;

  // Responsive SVG Coordinate calculations
  const width = 640;
  const height = 220;
  const padLeft = 16;
  const padRight = 16;
  const padTop = 24;
  const padBottom = 34;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const points = data.map((d, i) => {
    const x = padLeft + (data.length > 1 ? (i / (data.length - 1)) * chartW : chartW / 2);
    const y = padTop + chartH - (d.carbon / maxCarbon) * chartH;
    return { ...d, x, y };
  });

  // Generate smooth SVG bezier path
  const linePath = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cpX1 = prev.x + (pt.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (pt.x - prev.x) / 2;
    const cpY2 = pt.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${pt.x} ${pt.y}`;
  }, "");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x || chartW} ${padTop + chartH} L ${points[0]?.x || padLeft} ${padTop + chartH} Z`;

  return (
    <div
      className={`rounded-[26px] border p-6 transition-colors duration-500 ${
        darkMode
          ? "border-white/10 bg-[#14261e]"
          : "border-[#183326]/10 bg-[#fbf8f2]"
      }`}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8fbd91]">
            Cumulative Sequestration
          </span>
          <h3 className="mt-1 font-serif text-2xl text-[var(--heading)]">
            Environmental forecast
          </h3>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            Estimated carbon absorption trajectory over your planning horizon
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#8fbd91]/15 px-3 py-1 text-[10px] font-bold text-[#186a43] dark:text-[#8fbd91]">
            {years} years projection
          </span>
          <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-[10px] font-bold text-[var(--heading)]">
            {finalCarbon.toLocaleString()} kg Total
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full select-none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="carbonAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fbd91" stopOpacity={darkMode ? "0.35" : "0.45"} />
              <stop offset="50%" stopColor="#8fbd91" stopOpacity={darkMode ? "0.15" : "0.18"} />
              <stop offset="100%" stopColor="#8fbd91" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="carbonLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4a8f5e" />
              <stop offset="70%" stopColor="#8fbd91" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          {/* Minimal Subtle Grid Lines */}
          {[0, 0.33, 0.66, 1].map((ratio, idx) => {
            const yLine = padTop + chartH * ratio;
            return (
              <line
                key={idx}
                x1={padLeft}
                y1={yLine}
                x2={width - padRight}
                y2={yLine}
                stroke={darkMode ? "rgba(255,255,255,0.12)" : "rgba(24,51,38,0.08)"}
                strokeWidth="1"
                strokeDasharray={idx < 3 ? "3 4" : "none"}
              />
            );
          })}

          {/* Smooth Gradient Area */}
          <path d={areaPath} fill="url(#carbonAreaGradient)" />

          {/* Main Curve Line */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#carbonLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Year Progression Points & Subtle Markers */}
          {points.map((pt, i) => {
            const isLast = i === points.length - 1;
            const isMid = i === Math.floor((points.length - 1) / 2);
            const isFirst = i === 0;
            const showPoint = isFirst || isMid || isLast || points.length <= 8;

            return (
              <g key={pt.year}>
                {showPoint && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isLast ? 4.5 : 2.5}
                    fill={isLast ? "#34d399" : "#8fbd91"}
                    stroke={darkMode ? "#14261e" : "#fbf8f2"}
                    strokeWidth={isLast ? 2 : 1.2}
                    className="transition-all duration-300"
                  />
                )}

                {/* Clean X-axis Progression Markers */}
                {(isFirst || isLast || isMid || (points.length <= 10 && (i + 1) % 2 === 0)) && (
                  <text
                    x={pt.x}
                    y={height - 8}
                    textAnchor={isFirst ? "start" : isLast ? "end" : "middle"}
                    fontSize="9.5"
                    fontWeight="600"
                    fill={darkMode ? "rgba(255,255,255,0.7)" : "rgba(24,51,38,0.65)"}
                  >
                    Y{pt.year}
                  </text>
                )}

                {/* Final Value Highlight Label above the last point */}
                {isLast && (
                  <g transform={`translate(${pt.x - 6}, ${pt.y - 10})`}>
                    <text
                      textAnchor="end"
                      fontSize="10.5"
                      fontWeight="700"
                      fill={darkMode ? "#8fbd91" : "#186a43"}
                    >
                      {pt.carbon.toLocaleString()} kg CO₂
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between border-t border-[var(--border)] pt-3.5 text-[11px]">
        <div className="flex items-center gap-2 text-[var(--muted)]">
          <span className="h-2 w-2 rounded-full bg-[#8fbd91]" />
          <span>Palm species: <strong className="text-[var(--heading)]">{palm.name}</strong></span>
          <span className="text-[var(--faint)]">({palm.carbon} kg/palm/yr)</span>
        </div>

        <div className="text-[var(--muted)]">
          Annual absorption rate:{" "}
          <strong className="text-[#186a43] dark:text-[#8fbd91]">
            {(trees * palm.carbon).toLocaleString()} kg CO₂ / year
          </strong>
        </div>
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

    const [palm, setPalm] = useState(location.state?.selectedPalm || PALMS[0]);
  const [trees, setTrees] = useState(location.state?.trees || 24);
  const [years, setYears] = useState(location.state?.years || 10);
  const [override, setOverride] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("nakheel-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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
    const rootElement = document.documentElement;
    const theme = isDark ? "dark" : "light";
    rootElement.setAttribute("data-theme", theme);
    rootElement.classList.toggle("dark", isDark);
    localStorage.setItem("nakheel-theme", theme);
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

  const calculationPlan = useMemo(() => {
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

  const bgClass = "bg-[var(--bg)]";
  const textClass = "text-[var(--text)]";
  const cardBgClass = "bg-[var(--surface)]";
  const borderClass = "border-[var(--border)]";
  const secondaryTextClass = "text-[var(--muted)]";

  const exportReport = () => {
    const reportWindow = window.open("", "_blank", "width=900,height=760");
    if (!reportWindow) {
      window.alert("Please allow pop-ups to download the impact report.");
      return;
    }

    const rowsHtml = [
      ["Palm variety", palm.name],
      ["Number of palms", `${trees}`],
      ["Planning horizon", `${years} years`],
      ["Recommended area", `${area.toLocaleString()} m²`],
      ["Shade coverage", `${results.shade.toLocaleString()} m²`],
      ["Carbon sequestration", `${results.carbon.toLocaleString()} kg CO₂`],
      ["Cooling effect", `${results.cooling.toLocaleString()} m²`],
      ["Annual water", `${results.annualWater.toLocaleString()} L / year`],
      ["Impact score", `${results.score}/100`],
    ]
      .map(([label, value]) => `<tr><td>${label}</td><td>${value}</td></tr>`)
      .join("");

    reportWindow.document.write(`<!doctype html><html><head><title>Nakheel Impact Report</title><style>body{font-family:Arial,sans-serif;margin:0;padding:28px;background:#f7f2e8;color:#102b23}.report{max-width:720px;margin:0 auto;background:#fffdf9;border:1px solid #e7deca;border-radius:18px;overflow:hidden}.header{background:linear-gradient(135deg,#1f8a54,#0f3d2e);color:#fff;padding:28px 32px}.header h1{margin:0;font-size:30px;font-family:Georgia,serif}.meta{margin-top:8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.82}.content{padding:28px 32px 8px}table{width:100%;border-collapse:collapse}td{border-bottom:1px solid #e7deca;padding:14px 0;font-size:14px}td:first-child{color:#5d6d63;font-weight:700}td:last-child{text-align:right;font-weight:800}.footer{padding:18px 32px 30px;color:#5d6d63;font-size:12px}</style></head><body><div class="report"><div class="header"><div class="meta">Nakheel · Palm care & urban greening</div><h1>Environmental Impact Report</h1></div><div class="content"><table>${rowsHtml}</table></div><div class="footer">Generated on ${new Date().toLocaleDateString()} · Illustrative planning figures.</div></div></body></html>`);
    reportWindow.document.close();
    reportWindow.focus();

    setTimeout(() => {
      reportWindow.print();
      setTimeout(() => reportWindow.close(), 1000);
    }, 250);
  };

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
            <div className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center shadow bg-gradient-to-br from-[#34A868] to-[#0F3D2E] text-white">
              <LeafMark size={22} />
            </div>
            <div>
              <div className="font-serif font-extrabold text-[19px] text-[var(--heading)] tracking-tight dark:text-white">Nakheel</div>
              <div className={`text-[11px] font-medium -mt-0.5 ${secondaryTextClass}`}>Palm Care &amp; Urban Greening Guide</div>
            </div>
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
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Text */}
            <div>
              <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.22em] text-[#d89a68]">
                <span className="h-px w-8 bg-[#d89a68]" />
                Environmental impact calculator
              </p>

              <h1 className="max-w-3xl font-serif text-5xl leading-[.98] sm:text-7xl">
                Shape a cooler,{" "}
                <span className="text-[#d89a68]">greener</span> place.
              </h1>

              <p className={`mt-6 max-w-xl text-base leading-7 ${secondaryTextClass}`}>
                Build your planting plan and see its environmental value respond as you make decisions.
              </p>
            </div>

            {/* Small orbital leaf */}
            <div className="hidden shrink-0 lg:block">
              <OrbitalLeaf isDark={isDark} />
            </div>
          </div>
        </section>

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

              <div className="mb-8 overflow-hidden rounded-[26px] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(139,189,146,0.12),rgba(255,255,255,0.04))] p-4 shadow-[0_18px_40px_rgba(19,49,35,0.08)]">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8fbd91]">Planner accent</div>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#8fbd91] shadow-[0_0_16px_rgba(143,189,145,0.9)]" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#bfe4c3] text-[#2d5c47] shadow-[0_16px_28px_rgba(32,67,48,0.12)] ring-1 ring-[#8eb999]/60">
                    <LeafMark size={30} />
                  </div>
                  <div>
                    <div className="font-serif text-2xl leading-none text-[var(--heading)]">{palm.name}</div>
                    <div className="mt-1 text-[11px] italic text-[var(--muted)]">{palm.scientific || "Phoenix dactylifera"}</div>
                  </div>
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
                  isDark={isDark}
                />
                <Slider
                  label="Planning horizon"
                  value={years}
                  min={1}
                  max={30}
                  unit=" years"
                  onChange={setYears}
                  isDark={isDark}
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

              {/* Decorative Palm Area Below Auto Recommended Area */}
              <PremiumDecorativePalm isDark={isDark} palmName={palm.name} />
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
                  <Metric key={item.title} item={item} wide={index === 2} isDark={isDark} />
                ))}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_155px]">
                <div className={`rounded-[22px] border ${borderClass} ${cardBgClass} p-5`}>
                  <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8fbd91]">
                    <Leaf size={16} /> Selected palm
                  </p>
                  <h3 className="font-serif text-2xl">{palm.name}</h3>
                  <p className={`mt-1 text-xs italic ${secondaryTextClass}`}>{palm.scientific || "Phoenix dactylifera"}</p>
                  <p className={`mt-3 text-xs leading-5 ${secondaryTextClass}`}>
                    Spacing: {palm.spacing}m × {palm.spacing}m
                  </p>
                </div>
                <div className={`rounded-[22px] border ${borderClass} ${cardBgClass} p-3`}>
                  <Score value={results.score} isDark={isDark} />
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
                04 / Calculation summary
              </p>
              <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                <section className={`rounded-[28px] border ${borderClass} ${cardBgClass} p-7`}>
                  <div className={`mb-7 text-xs font-bold uppercase tracking-[0.18em] ${isDark ? "text-[#8fbd91]" : "text-[#47785A]"}`}>Project parameters</div>
                  <div className="mb-8 flex items-center gap-4">
                    <div className={`grid h-14 w-14 place-items-center rounded-2xl ${isDark ? "bg-[#8fbd91]/20 text-[#8fbd91]" : "bg-[#82B58C]/20 text-[#47785A]"}`}><LeafMark /></div>
                    <div>
                      <div className="font-serif text-3xl text-[var(--heading)]">{calculationPlan.selectedPalm.name}</div>
                      <div className={`text-xs italic ${secondaryTextClass}`}>{calculationPlan.selectedPalm.scientific || "Phoenix dactylifera"}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`rounded-2xl p-4 ${isDark ? "bg-white/[0.06]" : "bg-[#F7F2E8]"}`}><div className="text-2xl font-serif text-[var(--heading)]">{calculationPlan.trees}</div><div className={`mt-1 text-[10px] uppercase tracking-wider ${secondaryTextClass}`}>Palms</div></div>
                    <div className={`rounded-2xl p-4 ${isDark ? "bg-white/[0.06]" : "bg-[#F7F2E8]"}`}><div className="text-2xl font-serif text-[var(--heading)]">{calculationPlan.area}</div><div className={`mt-1 text-[10px] uppercase tracking-wider ${secondaryTextClass}`}>m² area</div></div>
                    <div className={`rounded-2xl p-4 ${isDark ? "bg-white/[0.06]" : "bg-[#F7F2E8]"}`}><div className="text-2xl font-serif text-[var(--heading)]">{calculationPlan.years}</div><div className={`mt-1 text-[10px] uppercase tracking-wider ${secondaryTextClass}`}>Years</div></div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-[#183326]/10 bg-[#183326] p-7 text-[#F5F0E5] shadow-[0_24px_70px_rgba(36,60,45,.16)]">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#D99A6B]">Environmental value</div>
                    <div className="rounded-full bg-[#82B58C]/20 px-3 py-1 text-[10px] font-bold text-[#82B58C]">Live estimate</div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div><div className="text-4xl font-serif text-white">{calculationPlan.results.shade.toLocaleString()}</div><div className="mt-1 text-xs text-white/70">m² shade</div></div>
                    <div><div className="text-4xl font-serif text-white">{calculationPlan.results.annualWater.toLocaleString()}</div><div className="mt-1 text-xs text-white/70">L / year</div></div>
                    <div><div className="text-4xl font-serif text-white">{calculationPlan.results.carbon.toLocaleString()}</div><div className="mt-1 text-xs text-white/70">kg CO₂</div></div>
                  </div>
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <div className="flex items-center justify-between text-sm"><span className="text-white/70">Environmental impact score</span><strong className="text-[#82B58C]">{calculationPlan.results.environmentalScore}/100</strong></div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#82B58C]" style={{ width: `${calculationPlan.results.environmentalScore}%` }} /></div>
                  </div>
                </section>
              </div>
            </div>

            {/* Environmental Metrics */}
            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                05 / Environmental metrics
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${isDark ? "text-[#8fbd91]" : "text-[#186a43]"}`}>
                    Shade Coverage
                  </p>
                  <p className="mt-3 font-serif text-2xl text-[var(--heading)]">{results.shade.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>m² of shade</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${isDark ? "text-[#8fbd91]" : "text-[#186a43]"}`}>
                    Carbon Sequestration
                  </p>
                  <p className="mt-3 font-serif text-2xl text-[var(--heading)]">{results.carbon.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>kg over {years} years</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${isDark ? "text-[#8fbd91]" : "text-[#186a43]"}`}>
                    Cooling Effect
                  </p>
                  <p className="mt-3 font-serif text-2xl text-[var(--heading)]">{results.cooling.toLocaleString()}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>estimated m²</p>
                </div>
                <div className={`rounded-2xl border ${borderClass} ${cardBgClass} p-5`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[.15em] ${isDark ? "text-[#8fbd91]" : "text-[#186a43]"}`}>
                    Annual Water
                  </p>
                  <p className="mt-3 font-serif text-2xl text-[var(--heading)]">{(results.annualWater / 1000).toFixed(1)}</p>
                  <p className={`text-xs ${secondaryTextClass}`}>K liters/year</p>
                </div>
              </div>
            </div>

            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <p className="mb-6 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                06 / Growth forecast
              </p>
              <ImpactTrendChart palm={palm} trees={trees} years={years} darkMode={isDark} />
            </div>

            <div className={`border-t ${borderClass} p-6 sm:p-10 lg:p-12`}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#d89a68]">
                    07 / Report export
                  </p>
                  <h3 className="font-serif text-3xl leading-none text-[var(--heading)]">Download your impact summary.</h3>
                </div>
                <button
                  type="button"
                  onClick={exportReport}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-[11px] font-bold uppercase tracking-[.16em] text-white shadow-[0_18px_35px_rgba(20,102,63,0.2)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                    <path d="M12 3v11" />
                    <path d="M7 19l5 5 5-5" />
                    <path d="M4 21h16" />
                  </svg>
                  Download Impact Report (PDF)
                </button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
