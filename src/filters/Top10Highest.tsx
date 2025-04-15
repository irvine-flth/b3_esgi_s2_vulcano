import { Volcano } from "../types";

export const id = "Top10Highest";
export const label = "Top 10 les plus hauts";

export function filter(data: Volcano[]): Volcano[] {
  return [...data]
    .sort((a, b) => (b.elevation ?? 0) - (a.elevation ?? 0))
    .slice(0, 10);
}
