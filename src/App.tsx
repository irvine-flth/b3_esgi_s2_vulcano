import { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap";
import FilterPanel from "./components/FilterPanel";
import { filters } from "./filters/filters";
import { Volcano } from "./types";

function App() {
  const [allVolcanoes, setAllVolcanoes] = useState<Volcano[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredVolcanoes, setFilteredVolcanoes] = useState<Volcano[]>([]);

  useEffect(() => {
    fetch("/data/vulcanoes.json")
      .then((res) => res.json())
      .then((data) => setAllVolcanoes(data));
  }, []);

  useEffect(() => {
    const result: Volcano[] = [];

    filters.forEach((f) => {
      if (activeFilters.includes(f.id)) {
        result.push(...f.filter(allVolcanoes));
      }
    });

    const unique = new Map(result.map((v) => [v.id ?? v.name, v]));
    setFilteredVolcanoes(Array.from(unique.values()));
  }, [activeFilters, allVolcanoes]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <FilterPanel
        filters={activeFilters}
        onToggleFilter={toggleFilter}
        availableFilters={filters.map((f) => ({ id: f.id, label: f.label }))}
      />
      <WorldMap volcanoList={filteredVolcanoes} />
    </div>
  );
}

export default App;
