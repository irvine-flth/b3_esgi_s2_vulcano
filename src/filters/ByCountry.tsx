import { Volcano } from "../types";

export const id = "ByCountry";
export const label = "Pays";
export const type = "select";

export function filter(data: Volcano[], selected: string): Volcano[] {
  if (!selected) return [];
  return data.filter(
    (v) => v.country?.toLowerCase() === selected.toLowerCase()
  );
}
