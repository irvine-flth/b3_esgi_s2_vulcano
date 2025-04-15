import { Volcano } from "../types";

export const id = "Top10LastActivity";
export const label = "Top 10 récemment actifs";
export const type = "checkbox";

function extractYear(eruption?: string): number | null {
    if (!eruption || eruption.toLowerCase().includes("unknown")) return null;

    const match = eruption.match(/(\d{3,4})\s*(CE|BCE)?/i);
    if (!match) return null;
  
    const year = parseInt(match[1]);
    const era = match[2]?.toUpperCase();
  
    return era === "BCE" ? -year : year;
  }
  

export function filter(data: Volcano[]): Volcano[] {
    const filtered = [...data]
    .filter((v) => extractYear(v.lastEruption) !== null)
    .sort((a, b) => (b.elevation ?? 0) - (a.elevation ?? 0));

  return filtered.slice(0, 10);
}
