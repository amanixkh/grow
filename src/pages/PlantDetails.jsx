import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PALMS, LEVEL_LABEL } from "../Data/plams";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const LEVEL_PCT = {
  high: 100,
  med: 62,
  low: 28
};

const LEVEL_COLOR = {
  high: "var(--accent)",
  med: "var(--accent-amber)",
  low: "var(--accent-red)"
};

function DetailMeter({ label, level }) {
return (
<div>
<div className="flex items-center justify-between mb-2">
<span className="text-[13px] font-bold text-[var(--muted)]">
{label}
</span>

<span
className="text-[11px] font-extrabold px-2.5 py-1 rounded-full"
style={{
color: LEVEL_COLOR[level],
backgroundColor: `color-mix(in srgb, ${LEVEL_COLOR[level]} 14%, transparent)`
}}
>
{LEVEL_LABEL[level]}
</span>
</div>

<div className="h-2 rounded-full bg-[var(--level-off)] overflow-hidden">
<div
className="h-full rounded-full transition-all duration-700"
style={{
width: `${LEVEL_PCT[level]}%`,
backgroundColor: LEVEL_COLOR[level]
}}
/>
</div>
</div>
);
}

function InfoCard({ label, value }) {
return (
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-[14px] p-4">
<div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)] mb-1.5">
{label}
</div>
<div className="text-[13px] font-extrabold text-[var(--heading)] leading-snug">
{value}
</div>
</div>
);
}

export default function PlantDetails() {
const { id } = useParams();
const navigate = useNavigate();

const palm = PALMS.find((p) => String(p.id) === id);

useEffect(() => {
window.scrollTo({
top: 0,
behavior: "instant"
});
}, [id]);

if (!palm) {
return (
<div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center">
<div className="text-center">
<p className="text-[var(--muted)] mb-4">
Variety not found.
</p>
<button
onClick={() => navigate("/")}
className="text-[var(--accent)] font-bold underline"
>
Back to Dashboard
</button>
</div>
</div>
);
}

const similar = PALMS
.filter(
(p) =>
p.id !== palm.id &&
(p.salinity === palm.salinity || p.water === palm.water)
)
.slice(0, 3);

return (
<div className="bg-[var(--bg)] text-[var(--text)] min-h-screen font-sans transition-colors duration-300">
<Navbar variant="details" />

<main className="max-w-[1050px] mx-auto px-5 md:px-8 py-10 md:py-14">

<section className="mb-7">
<div className="relative overflow-hidden bg-[var(--surface)] border border-[var(--border)] rounded-[24px] min-h-[250px]">

<div className="absolute inset-y-0 right-0 w-[55%] md:w-[48%] pointer-events-none">
<img
src={palm.image}
alt={palm.name}
className="w-full h-full object-cover opacity-65"
style={{
maskImage:
"linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.78) 75%, black 100%)",
WebkitMaskImage:
"linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 18%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.78) 75%, black 100%)"
}}
/>
</div>

<div className="relative z-10 flex items-center min-h-[250px] px-6 md:px-10 py-8">
<div className="max-w-[520px]">

<div className="inline-flex items-center gap-2 mb-4">
<span className="w-8 h-[2px] bg-[var(--accent)] rounded-full" />
<span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">
Palm variety
</span>
</div>

<h1 className="font-serif text-[36px] md:text-[46px] font-black text-[var(--heading)] tracking-tight leading-none">
{palm.name}
</h1>

<p className="mt-4 text-[14px] md:text-[15px] text-[var(--muted)] leading-relaxed max-w-[470px]">
{palm.desc}
</p>

<div className="mt-4">
<div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] mb-2">
Suitable Regions
</div>

<div className="flex flex-wrap gap-1.5">
{palm.areas.map((area) => (
<span
key={area}
className="text-[11px] font-bold text-[var(--tag-green-text)] bg-[var(--tag-green-bg)] px-2.5 py-1.5 rounded-full"
>
{area}
</span>
))}
</div>
</div>

</div>
</div>
</div>
</section>

<section className="bg-[var(--surface)] border border-[var(--border)] rounded-[20px] p-6 md:p-7 mb-5">
<div className="flex items-center gap-3 mb-3">

<div className="w-8 h-8 rounded-lg bg-[var(--tag-green-bg)] flex items-center justify-center">
<span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
</div>

<h2 className="text-[17px] font-extrabold text-[var(--heading)]">
Overview
</h2>

</div>

<p className="text-[14px] text-[var(--muted)] leading-relaxed">
{palm.desc}
</p>
</section>

<section className="mb-7">
<div className="bg-[var(--surface)] border border-[var(--border)] rounded-[20px] p-6 md:p-7">

<h2 className="text-[17px] font-extrabold text-[var(--heading)] mb-5">
Growing Conditions
</h2>

<div className="flex flex-col gap-5">

<DetailMeter label="Salinity tolerance" level={palm.salinity} />
<DetailMeter label="Water needs" level={palm.water} />

<div className="flex items-center justify-between pt-3 border-t border-dashed border-[var(--border)]">

<span className="text-[13px] text-[var(--muted)] font-bold">
Shade coverage
</span>

<span className="text-[14px] text-[var(--heading)] font-extrabold">
{palm.shade} m²
</span>

</div>
</div>
</div>
</section>

<section className="mb-8">

<div className="flex items-center gap-3 mb-4">

<div className="w-9 h-9 rounded-xl bg-[var(--tag-tan-bg)] flex items-center justify-center">
<svg
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="1.8"
className="w-5 h-5 text-[var(--tag-tan-text)]"
>
<path d="M12 21V13" />
<path d="M12 13C12 8 9 6 5 6C5 10 7.5 13 12 13Z" />
<path d="M12 13C12 8 15 6 19 6C19 10 16.5 13 12 13Z" />
</svg>
</div>

<div>
<h2 className="text-[20px] font-extrabold text-[var(--heading)]">
Agriculture & Fruit Guide
</h2>

<p className="text-[12.5px] text-[var(--muted)] mt-0.5">
Key information about this variety
</p>
</div>

</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-3">

<InfoCard label="Harvest season" value={palm.harvest} />
<InfoCard label="Palm height" value={palm.height} />
<InfoCard label="Productive age" value={palm.productiveAge} />
<InfoCard label="Fruit color" value={palm.fruitColor} />

</div>
</section>

<section className="bg-[var(--surface-soft)] border border-[var(--border)] rounded-[20px] p-6 md:p-7 mb-9">

<div className="flex gap-4 items-start">

<div className="w-10 h-10 rounded-xl bg-[var(--tag-tan-bg)] flex-shrink-0 flex items-center justify-center">
<svg
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="1.8"
className="w-5 h-5 text-[var(--tag-tan-text)]"
>
<path d="M12 3a9 9 0 100 18 9 9 0 000-18Z" />
<path d="M12 7v5l3 2" />
</svg>
</div>

<div>
<h2 className="text-[16px] font-extrabold text-[var(--heading)] mb-2">
Historical & Cultural Note
</h2>

<p className="text-[13.5px] text-[var(--muted)] leading-relaxed">
{palm.history}
</p>
</div>

</div>
</section>

{similar.length > 0 && (
<section>

<h2 className="text-[19px] font-extrabold text-[var(--heading)] mb-4">
Similar Varieties
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

{similar.map((p) => (
<button
key={p.id}
onClick={() => navigate(`/plant/${p.id}`)}
className="text-left bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[var(--surface-soft)] hover:border-[var(--accent)] hover:shadow-[0_14px_30px_-18px_rgba(0,0,0,0.45)]"
>

<div className="font-extrabold text-[var(--heading)] text-[14.5px]">
{p.name}
</div>

<div className="text-[11px] text-[var(--muted)] mt-1">
View variety
</div>

</button>
))}

</div>
</section>
)}

</main>

<Footer />
</div>
);
}