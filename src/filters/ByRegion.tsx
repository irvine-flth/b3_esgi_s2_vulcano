import { Volcano } from "../types";

export const id = "ByRegion";
export const label = "Continent";
export const type = "select";

export function filter(data: Volcano[], selected: string): Volcano[] {
  if (!selected) return [];
  return data.filter(
    (v) => v.regionGroup?.toLowerCase() === selected.toLowerCase()
  );
}
