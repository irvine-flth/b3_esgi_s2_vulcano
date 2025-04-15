import { FC } from "react";

interface FilterPanelProps {
  filters: string[];
  onToggleFilter: (filter: string) => void;
}

const availableFilters = [
  "Top10Highest",
  "Top10Lowest",
  "RecentlyActive",
  "StratoVolcanoes",
  "ActiveEurope",
  "ActiveUSA",
  "ActiveSouthAmerica",
  "ByContinent",
  "ByCountry",
];

const FilterPanel: FC<FilterPanelProps> = ({ filters, onToggleFilter }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "250px",
        height: "100%",
        background: "#fff",
        padding: "1rem",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <h3>Filters</h3>
      {availableFilters.map((filter) => (
        <div key={filter}>
          <input
            type="checkbox"
            id={filter}
            checked={filters.includes(filter)}
            onChange={() => onToggleFilter(filter)}
          />
          <label htmlFor={filter} style={{ marginLeft: "0.5rem" }}>
            {filter}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
