import { FC } from "react";

interface FilterPanelProps {
  filters: string[];
  selectedValues: Record<string, string>;
  availableFilters: { id: string; label: string; type: string }[];
  onToggleFilter: (filter: string) => void;
  onSelectChange: (filterId: string, value: string) => void;
  countryOptions?: (string | undefined)[];
  regionOptions?: (string | undefined)[];
  toggleTectonicPoints: () => void;
}

const FilterPanel: FC<FilterPanelProps> = ({
  filters,
  selectedValues,
  availableFilters,
  onToggleFilter,
  onSelectChange,
  countryOptions,
  regionOptions,
  toggleTectonicPoints,
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
        color: "#000",
        padding: "1rem",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <h3>Filtres</h3>
      {availableFilters.map((filter) => (
        <div key={filter.id}>
          {filter.type === "checkbox" && (
            <>
              <input
                type="checkbox"
                id={filter.id}
                checked={filters.includes(filter.id)}
                onChange={() => onToggleFilter(filter.id)}
              />
              <label htmlFor={filter.id} style={{ marginLeft: "0.5rem" }}>
                {filter.label}
              </label>
            </>
          )}

          {filter.type === "select" && filter.id === "ByCountry" && (
            <>
              <label htmlFor={filter.id}>{filter.label}</label>
              <select
                id={filter.id}
                value={selectedValues[filter.id] || ""}
                onChange={(e) => onSelectChange(filter.id, e.target.value)}
              >
                <option value="">-- Sélectionner un pays --</option>
                {countryOptions?.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </>
          )}

          {filter.type === "select" && filter.id === "ByRegion" && (
            <>
              <label htmlFor={filter.id}>{filter.label}</label>
              <select
                id={filter.id}
                value={selectedValues[filter.id] || ""}
                onChange={(e) => onSelectChange(filter.id, e.target.value)}
              >
                <option value="">-- Sélectionner un continent --</option>
                {regionOptions?.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      ))}
      <>
        <input
          type="checkbox"
          id="TectonicPoints"
          onChange={() => toggleTectonicPoints()}
        />
        <label htmlFor="TectonicPoints" style={{ marginLeft: "0.5rem" }}>
          Plaques tectoniques
        </label>
      </>
    </div>
  );
};

export default FilterPanel;
