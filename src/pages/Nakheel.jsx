import { useMemo, useState } from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import StatsStrip from "../components/statsStrip";
import VarietyChart from "../components/varietyChart";
import FilterPanel from "../components/filterPanel";
import CardsGrid from "../components/cardsplam";
import Footer from "../components/footer";
import { PALMS, LEVEL_RANK } from "../Data/plams";

const DEFAULT_FILTERS = { query: "", region: "", salinity: "", water: "", sort: "name" };

export default function Nakheel() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredPalms = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    let list = PALMS.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.latin.toLowerCase().includes(q);
      const matchesRegion = !filters.region || p.areas.includes(filters.region);
      const matchesSalinity = !filters.salinity || p.salinity === filters.salinity;
      const matchesWater = !filters.water || p.water === filters.water;
      return matchesQuery && matchesRegion && matchesSalinity && matchesWater;
    });

    if (filters.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (filters.sort === "shade") list.sort((a, b) => b.shade - a.shade);
    else if (filters.sort === "salinity") list.sort((a, b) => LEVEL_RANK[b.salinity] - LEVEL_RANK[a.salinity]);

    return list;
  }, [filters]);

  const hasActiveFilter = !!(filters.query || filters.region || filters.salinity || filters.water);

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen font-sans transition-colors duration-300">
      <Navbar />
      <Hero />
      <main className="max-w-[1240px] mx-auto px-8">
        <StatsStrip />
        <VarietyChart />
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