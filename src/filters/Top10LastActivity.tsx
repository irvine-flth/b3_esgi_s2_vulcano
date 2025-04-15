import { Volcano } from "../types";

export const id = "Top10Recent";
export const label = "Top 10 récemment actifs";

function extractYear(eruption: string | undefined): number | null {
  if (!eruption) return null;

  const match = eruption.match(/(\\d{3,4})\\s*(CE|BCE)?/);
  if (!match) return null;

  const year = parseInt(match[1]);
  const era = match[2];

  if (era === "BCE") return -year;
  return year;
}

export function filter(data: Volcano[]): Volcano[] {
    console.log("data", data);
  return [...data]
    .filter((v) => extractYear(v.lastEruption) !== null && v.lastEruption !== "Unknown")
    .sort((a, b) =>
      (extractYear(b.lastEruption) ?? -Infinity) -
      (extractYear(a.lastEruption) ?? -Infinity)
    )
    .slice(0, 10);
}
