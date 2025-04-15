import { FC } from "react";

interface FilterPanelProps {
  filters: string[];
  availableFilters: { id: string; label: string }[];
  onToggleFilter: (filter: string) => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  filters,
  availableFilters,
  onToggleFilter,
}) => {
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
      <h3>Filtres</h3>
      {availableFilters.map((filter) => (
        <div key={filter.id}>
          <input
            type="checkbox"
            id={filter.id}
            checked={filters.includes(filter.id)}
            onChange={() => onToggleFilter(filter.id)}
          />
          <label htmlFor={filter.id} style={{ marginLeft: "0.5rem" }}>
            {filter.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
