import { useLanguage } from "../LanguageContext";

const pestData = {
  en: {
    title: "Pest Control & Care Schedule",
    subtitle: "Practical guidance for Iraqi growing conditions and seasonal protection",
    schedule: [
      {
        title: "Irrigation timing",
        detail: "Irrigate deeply but infrequently during the hot season; aim for early morning watering to reduce moisture stress and limit fungal pressure.",
      },
      {
        title: "Fertilization windows",
        detail: "Apply balanced organic compost before flowering and a light nitrogen feed after fruit set to support strong growth without excess salt build-up.",
      },
      {
        title: "Dubas bug monitoring",
        detail: "Inspect the crown and young fronds every 2–3 weeks during spring. Prune heavily infested leaves and apply targeted integrated pest management when thresholds are reached.",
      },
      {
        title: "Red Palm Weevil watch",
        detail: "Check the trunk base, leaf axils, and wounds for signs of tunneling or oozing. Treat cut surfaces promptly and remove damaged palms early.",
      },
    ],
    cards: [
      { label: "Critical protection window", value: "March – June" },
      { label: "Most at-risk pests", value: "Dubas bug · Red Palm Weevil" },
      { label: "Best practice", value: "Early inspection + sanitation" },
      { label: "Soil care", value: "Avoid salinity buildup" },
    ],
  },
  ar: {
    title: "دليل العناية والوقاية من الآفات",
    subtitle: "إرشادات عملية ومخصصة لبيئة العراق ومواسم الحماية الزراعية",
    schedule: [
      {
        title: "مواعيد الري",
        detail: "قم بالري العميق وبكميات معتدلة في فصل الحرارة، ويفضل الري في الصباح الباكر لتقليل التوتر المائي وتقليل ضغط الفطريات.",
      },
      {
        title: "أوقات التسميد",
        detail: "اضف السماد العضوي المتوازن قبل الإزهار، ثم جرعة خفيفة من النيتروجين بعد العقد الثمري لدعم النمو دون تراكم الأملاح.",
      },
      {
        title: "مراقبة حشرة الدوباس",
        detail: "افحص التاج والأوراق الصغيرة كل 2–3 أسابيع في الربيع. قم بقطع الأوراق المتضررة بشدة وتطبيق المكافحة المتكاملة عند الوصول إلى العتبة الحرجة.",
      },
      {
        title: "مراقبة سوسة النخيل الحمراء",
        detail: "افحص قاعدة الجذع، محيط الأوراق، والجروح بحثاً عن الأنفاق أو التسرب. عالج الجروح فوراً واقطع النخيل المصاب في وقت مبكر.",
      },
    ],
    cards: [
      { label: "نافذة الحماية الحرجة", value: "مارس – يونيو" },
      { label: "الآفات الأكثر خطورة", value: "دوباس · سوسة النخيل الحمراء" },
      { label: "أفضل الممارسات", value: "الفحص المبكر + النظافة" },
      { label: "العناية بالتربة", value: "تجنب تراكم الملوحة" },
    ],
  },
};

export default function PestCareGuide() {
  const { lang, dir } = useLanguage();
  const content = pestData[lang] || pestData.en;
  const isRTL = dir === "rtl";

  return (
    <section className="mb-8" dir={dir}>
      <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_45px_rgba(15,61,46,0.08)] md:p-7">
        <div className={`mb-6 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tag-green-bg)] text-[var(--accent)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5" aria-hidden="true">
              <path d="M12 3c3 2.7 5.5 5.9 5.5 9.5A5.5 5.5 0 0 1 6.5 12.5C6.5 8.8 9 5.5 12 3Z" />
              <path d="M12 9.5v5M9.5 12h5" />
            </svg>
          </div>
          <div className={isRTL ? "text-right" : "text-left"}>
            <h2 className="text-[20px] font-extrabold text-[var(--heading)]">{content.title}</h2>
            <p className="mt-1 text-[12.5px] text-[var(--muted)]">{content.subtitle}</p>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {content.cards.map((card) => (
            <div key={card.label} className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-soft)] p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{card.label}</div>
              <div className="mt-3 text-[14px] font-extrabold text-[var(--heading)]">{card.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.schedule.map((item) => (
            <div key={item.title} className="rounded-[18px] border border-[var(--border)] bg-[var(--surface-soft)] p-5">
              <div className={`mb-3 flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--tag-green-bg)] text-[var(--accent)] text-[11px] font-black">
                  {item.title.charAt(0)}
                </span>
                <h3 className={`text-[15px] font-extrabold text-[var(--heading)] ${isRTL ? "text-right" : "text-left"}`}>
                  {item.title}
                </h3>
              </div>
              <p className={`text-[13px] leading-6 text-[var(--muted)] ${isRTL ? "text-right" : "text-left"}`}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
