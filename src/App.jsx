import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from './LanguageContext'
import backImg from './assets/back.jpg'

const BIRDS = [
  { top: '13%', duration: 25, delay: 0, size: 28 },
  { top: '21%', duration: 31, delay: 5, size: 20 },
  { top: '9%', duration: 28, delay: 10, size: 24, reverse: true },
  { top: '27%', duration: 35, delay: 16, size: 17, reverse: true },
  { top: '17%', duration: 40, delay: 22, size: 14 },
]

const KEYFRAMES = `
  @keyframes fly-across {
    0% { transform: translateX(-70px) translateY(0); }
    20% { transform: translateX(20vw) translateY(-5px); }
    40% { transform: translateX(40vw) translateY(2px); }
    60% { transform: translateX(60vw) translateY(-4px); }
    80% { transform: translateX(80vw) translateY(3px); }
    100% { transform: translateX(110vw) translateY(0); }
  }

  @keyframes fly-across-reverse {
    0% { transform: translateX(70px) translateY(0) scaleX(-1); }
    20% { transform: translateX(-20vw) translateY(-5px) scaleX(-1); }
    40% { transform: translateX(-40vw) translateY(2px) scaleX(-1); }
    60% { transform: translateX(-60vw) translateY(-4px) scaleX(-1); }
    80% { transform: translateX(-80vw) translateY(3px) scaleX(-1); }
    100% { transform: translateX(-110vw) translateY(0) scaleX(-1); }
  }

  @keyframes flap-left {
    0% { transform: rotate(8deg); }
    50% { transform: rotate(-8deg); }
    100% { transform: rotate(8deg); }
  }

  @keyframes flap-right {
    0% { transform: rotate(-8deg); }
    50% { transform: rotate(8deg); }
    100% { transform: rotate(-8deg); }
  }
`

function Bird({ top, duration, delay, size, reverse }) {
  return (
    <span
      className="absolute"
      style={{
        top,
        left: reverse ? 'auto' : '-70px',
        right: reverse ? '-70px' : 'auto',
        animationName: reverse ? 'fly-across-reverse' : 'fly-across',
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
      }}
      aria-hidden="true"
    >
      <svg width={size} height={size * 0.45} viewBox="0 0 60 28" fill="none" style={{ overflow: 'visible' }}>
        <path
          d="M30 14 C22 8 14 6 5 9 C14 8 21 11 29 16"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ transformOrigin: '30px 14px', animation: 'flap-left 0.8s ease-in-out infinite' }}
        />
        <path
          d="M30 14 C38 8 46 6 55 9 C46 8 39 11 31 16"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ transformOrigin: '30px 14px', animation: 'flap-right 0.8s ease-in-out infinite' }}
        />
      </svg>
    </span>
  )
}

function Logo() {
  return (
    <span className="inline-flex items-center gap-[9px] text-[#f6e9c8]">
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path d="M13 26C13 26 13 15 13 10C13 6 9 3 3 3C3 9 7 12.5 13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 13C19 12.5 23 9 23 3C17 3 13 6 13 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M13 26C13 26 13 17 13 13C13 9 16 6 21 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
        <path d="M13 26C13 26 13 17 13 13C13 9 10 6 5 6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
      </svg>
      <span className="text-base font-semibold tracking-[.14em]">Nakheel</span>
    </span>
  )
}

export default function App() {
  const [started] = useState(false)
  const navigate = useNavigate()
  const { dir, lang, setLang, t } = useLanguage()

  return (
    <div dir={dir} className="relative min-h-screen overflow-hidden bg-[#172a24] text-[#f6e9c8]" style={{ fontFamily: "'Trebuchet MS', Arial, sans-serif" }}>
      <style>{KEYFRAMES}</style>
      <img className="absolute inset-0 h-full w-full object-cover object-center" src={backImg} alt="" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-[rgba(13,30,25,0.2)] to-[rgba(12,25,22,0.52)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 z-[1] text-[#f6e9c8]" aria-hidden="true">
        {BIRDS.map((bird, index) => (
          <Bird key={index} {...bird} />
        ))}
      </div>

      <header className="relative z-[2] flex items-center justify-between px-[5vw] py-7 max-[700px]:px-[7vw] max-[700px]:py-[22px]">
        <Logo />
        <div className="flex items-center rounded-full border border-[#f0cc83]/40 bg-[#172a24]/55 p-1 text-[10px] font-bold text-[#f6e9c8] backdrop-blur-sm">
          {[["en", "English"], ["ar", "العربية"], ["ku", "کوردی"]].map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`rounded-full px-2 py-1 transition-colors ${lang === code ? "bg-[#f0cc83] text-[#203d32]" : "hover:bg-white/10"}`}
              aria-label={`${t("language")}: ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-[1] grid min-h-[calc(100vh-80px)] place-items-center">
        <div className="ml-[17vw] mr-auto mt-[-3vh] flex w-[min(88vw,480px)] flex-col items-start gap-6 text-left max-[700px]:ml-auto max-[700px]:mr-[8vw] max-[700px]:mt-[-8vh] max-[700px]:w-[82vw] max-[700px]:gap-[23px] rtl:mr-[17vw] rtl:ml-auto rtl:text-right max-[700px]:rtl:mr-[8vw]">
          <div className="max-w-[430px] max-[700px]:min-w-0">
            <div className="m-0 mb-3.5 whitespace-nowrap text-[clamp(27px,3.2vw,42px)] font-medium leading-[1.05] tracking-[.01em] text-[#fff3d2] max-[700px]:whitespace-normal max-[700px]:text-[29px]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              {t("landingTitle")}
            </div>
            <p className="m-0 text-[15px] font-semibold leading-[1.6] tracking-[.04em] text-[#f0cc83] max-[700px]:leading-[1.5]">
              {t("landingSubtitle")}
            </p>
          </div>

          <button
            type="button"
            aria-label="Start"
            onClick={() => navigate('/dashboard')}
            className={`z-[3] inline-flex min-w-[178px] items-center justify-between gap-[22px] rounded-full border border-[rgba(240,204,131,0.75)] py-[10px] pl-[19px] pr-[11px] text-[#f7e9c5] shadow-[0_10px_24px_rgba(10,29,21,0.24),inset_0_1px_rgba(255,255,255,0.12)] transition-all duration-[350ms] ease-in-out hover:-translate-y-[3px] hover:bg-[#285744] hover:shadow-[0_15px_28px_rgba(10,29,21,0.3),inset_0_1px_rgba(255,255,255,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[#f6e9c8] motion-reduce:transition-none max-[700px]:min-w-[172px] max-[700px]:py-[14px] max-[700px]:pl-[18px] max-[700px]:pr-[14px] ${started ? 'bg-[#f2ca82]' : 'bg-[rgba(25,55,45,0.72)]'}`}
          >
            <span className="font-bold text-[13px] tracking-[.05em]">{started ? t("welcomeIn") : t("beginJourney")}</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f0cc83] text-[20px] text-[#203d32]" style={{ fontFamily: 'Arial, sans-serif' }} aria-hidden="true">→</span>
          </button>
        </div>
      </main>
    </div>
  )
}

