import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import WorldMap, { Volcano } from "./components/WorldMap";
import FilterPanel from "./components/FilterPanel";

const App = () => {
  const [allVolcanoes, setAllVolcanoes] = useState<Volcano[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [displayedVolcanoes, setDisplayedVolcanoes] = useState<Volcano[]>([]);

  useEffect(() => {
    fetch("/data/vulcanoes.json")
      .then((response) => response.json())
      .then((data) => setAllVolcanoes(data));
  }, []);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <FilterPanel filters={activeFilters} onToggleFilter={toggleFilter} />
      <WorldMap volcanoList={allVolcanoes} />
    </div>
  );
};

export default App;
