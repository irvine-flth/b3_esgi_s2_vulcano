import { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap";
import FilterPanel from "./components/FilterPanel";
import { filters } from "./filters/filters";
import { Volcano } from "./types";

function App() {
  const [allVolcanoes, setAllVolcanoes] = useState<Volcano[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [filteredVolcanoes, setFilteredVolcanoes] = useState<Volcano[]>([]);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    fetch("/data/vulcanoes.json")
      .then((res) => res.json())
      .then((data) => setAllVolcanoes(data));
  }, []);

  useEffect(() => {
    const result: Volcano[] = [];

    filters.forEach((f) => {
      if (activeFilters.includes(f.id)) {
        const param = selectedValues[f.id];
        const output =
          f.type === "select"
            ? f.filter(allVolcanoes, param)
            : f.filter(allVolcanoes);
        result.push(...output);
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

  const handleSelectChange = (filterId: string, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [filterId]: value,
    }));

    setActiveFilters((prev) => {
      if (value === "") {
        return prev.filter((f) => f !== filterId);
      }

      if (!prev.includes(filterId)) {
        return [...prev, filterId];
      }

      return prev;
    });
  };

  const countryOptions = Array.from(
    new Set(allVolcanoes.map((v) => v.country).filter(Boolean))
  ).sort();

  return (
    <div style={{ position: "relative" }}>
      <FilterPanel
        filters={activeFilters}
        selectedValues={selectedValues}
        availableFilters={filters.map((f) => ({
          id: f.id,
          label: f.label,
          type: f.type,
        }))}
        onToggleFilter={toggleFilter}
        onSelectChange={handleSelectChange}
        countryOptions={countryOptions}
      />
      <WorldMap volcanoList={filteredVolcanoes} />
    </div>
  );
}

export default App;
