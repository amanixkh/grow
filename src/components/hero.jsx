import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapConfig";

export default function Hero() {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const palmRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-title", { opacity: 0, y: 20, duration: 0.7 })
        .from(".hero-lead", { opacity: 0, y: 20, duration: 0.7 }, "-=0.45")
        .from(".hero-actions button", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
        .from(".hero-visual", { opacity: 0, scale: 0.9, duration: 0.8 }, "-=0.5");

      gsap.to(".ring-r1", { rotation: 360, duration: 40, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(".ring-r2", { rotation: -360, duration: 30, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
      gsap.to(palmRef.current, {
        y: -12,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const xTo = gsap.quickTo(visualRef.current, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(visualRef.current, "y", { duration: 0.6, ease: "power3.out" });

      const handleMove = (e) => {
        const rect = heroRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(relX * 24);
        yTo(relY * 24);
      };
      heroRef.current.addEventListener("mousemove", handleMove);

      return () => heroRef.current?.removeEventListener("mousemove", handleMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="pt-16 pb-10 overflow-hidden" ref={heroRef}>
      <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.15fr_.85fr] gap-14 items-center">
        <div>
          <h1 className="hero-title font-serif text-[32px] md:text-[44px] font-black text-[var(--heading)] leading-[1.28] tracking-tight">
            Your reference guide to <em className="not-italic text-[#E08A34]">palm varieties</em> and urban greening
          </h1>
          <p className="hero-lead mt-5 text-[16.5px] text-[var(--muted)] max-w-[520px] leading-relaxed">
            An interactive database that helps you pick the right palm variety for your area based on soil
            salinity, water needs, and shade coverage — helping bring more green space back into our cities.
          </p>
          <div className="hero-actions flex gap-3.5 mt-8">
            <button
              onClick={scrollToId("dashboard")}
              className="group bg-gradient-to-br from-[#14663F] to-[#0F3D2E] hover:from-[#1F8A54] hover:to-[#1F8A54] text-white px-6 py-3.5 rounded-xl text-[15px] font-bold shadow-lg transition-all hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Browse Varieties
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div ref={visualRef} className="hero-visual relative h-[340px] flex items-center justify-center">
          <div className="ring-r1 absolute w-[320px] h-[320px] rounded-full border-[1.5px] border-dashed border-[var(--border)]">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#E08A34]"></span>
          </div>
          <div className="ring-r2 absolute w-[230px] h-[230px] rounded-full border-[1.5px] border-dashed border-[var(--border-soft)]">
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1F8A54]"></span>
          </div>
          <svg ref={palmRef} viewBox="0 0 200 200" fill="none" className="w-[150px] h-[150px] relative z-10 drop-shadow-[0_18px_30px_rgba(15,61,46,0.25)]">
            <path d="M100 195V110" stroke="#A85A15" strokeWidth="7" strokeLinecap="round" />
            <path d="M100 112C100 112 60 95 40 55C75 55 100 90 100 112Z" fill="#34A868" />
            <path d="M100 112C100 112 140 95 160 55C125 55 100 90 100 112Z" fill="#1F8A54" />
            <path d="M100 112C100 112 68 82 60 40C92 48 100 90 100 112Z" fill="#14663F" />
            <path d="M100 112C100 112 132 82 140 40C108 48 100 90 100 112Z" fill="#0F3D2E" />
            <path d="M100 112C100 112 90 70 100 30C110 70 100 112 100 112Z" fill="#34A868" />
          </svg>
        </div>
      </div>
    </header>
  );
}