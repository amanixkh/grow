import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "../lib/gsapConfig";

export default function Navbar({ variant = "home", darkMode, setDarkMode }) {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navigate = useNavigate();
  const isDark = darkMode ?? false;

  const toggleDark = () => {
    const next = !isDark;
    if (setDarkMode) {
      setDarkMode(next);
    } else {
      document.documentElement.classList.toggle("dark", next);
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("nakheel-theme", next ? "dark" : "light");
    }
    gsap.fromTo(".theme-icon", { rotate: -90, opacity: 0 }, { rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" });
  };

  const scrollToId = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".nav-right > *", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        delay: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const handleLogoEnter = () => {
    gsap.to(logoRef.current, { rotate: -14, scale: 1.08, duration: 0.35, ease: "power2.out" });
  };
  const handleLogoLeave = () => {
    gsap.to(logoRef.current, { rotate: 0, scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark ? "bg-[#142a22]/90 border-[#2f443b] text-white" : "bg-[#f4f1ea]/90 border-[#e7deca] text-[#1e293b]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[76px]">
        <div className="flex items-center gap-3">
          <div
            ref={logoRef}
            onMouseEnter={handleLogoEnter}
            onMouseLeave={handleLogoLeave}
            className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center shadow bg-gradient-to-br from-[#34A868] to-[#0F3D2E] cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]">
              <path d="M12 22V12M12 12C12 6 8 3 3 3C3 8 6 12 12 12ZM12 12C12 6 16 3 21 3C21 8 18 12 12 12Z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="font-serif font-extrabold text-[19px] text-[var(--heading)] tracking-tight dark:text-white">Nakheel</div>
            <div className="text-[12px] text-[var(--muted)] font-medium -mt-0.5 dark:text-stone-200">Palm Care &amp; Urban Greening Guide</div>
          </div>
        </div>

        <div className="nav-right flex items-center gap-4">
          {variant === "details" ? (
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[var(--heading)] hover:text-[#1F8A54] transition-colors dark:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              Back
            </button>
          ) : variant === "dashboard" ? (
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-1.5 text-[14.5px] font-bold text-[var(--heading)] hover:text-[#1F8A54] transition-colors dark:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Home
            </button>
          ) : (
            <button
              onClick={scrollToId("dashboard")}
              className="relative text-[14.5px] font-bold text-[var(--heading)] group dark:text-white"
            >
              Dashboard
              <span className="absolute left-0 -bottom-1.5 h-[2px] w-full bg-[#1F8A54] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
            </button>
          )}

          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className={`w-10 h-10 rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
              isDark ? "border-[#325042] bg-[#0b1f15] text-white hover:border-[#4ca169]" : "border-[#dfe7dc] bg-[#f4f1ea] text-[#1e293b] hover:border-[#1F8A54]"
            }`}
          >
            {isDark ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="#F8D38A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="theme-icon w-[18px] h-[18px]">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="#14663F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="theme-icon w-[18px] h-[18px]">
                <path d="M20 14.5A8.5 8.5 0 1110.5 4a6.5 6.5 0 009.5 10.5z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}