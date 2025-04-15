import { Volcano } from "../types";

export const id = "Top10Lowest";
export const label = "Top 10 les plus bas";

export function filter(data: Volcano[]): Volcano[] {
  return [...data]
    .sort((a, b) => (a.elevation ?? 0) - (b.elevation ?? 0))
    .slice(0, 10);
}
