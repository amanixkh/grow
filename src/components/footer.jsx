import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsapConfig";
import { useLanguage } from "../LanguageContext";

export default function Footer() {
  const footerRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="about"
      className="border-t border-[var(--border)] py-10 mt-5 bg-[var(--surface-soft)] transition-colors duration-300"
    >
      <div className="max-w-[1240px] mx-auto px-8 flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#1F8A54]">
            <path
              d="M12 21V13M12 13C12 8 9 6 5 6C5 10 7.5 13 12 13ZM12 13C12 8 15 6 19 6C19 10 16.5 13 12 13Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-serif font-extrabold text-[var(--heading)] text-[15px]">Nakheel</span>
          <span className="w-1 h-1 rounded-full bg-[var(--faint)]"></span>
          <span className="text-[12px] font-bold text-[var(--muted)] tracking-wide uppercase">{t("footerTool")}</span>
        </div>

        <p className="text-[13px] text-[var(--faint)] text-center max-w-[440px] leading-relaxed">
          {t("footerText")}
        </p>
      </div>
    </footer>
  );
}