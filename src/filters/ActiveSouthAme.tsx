import { Volcano } from "../types";

export const id = "ActiveSouthAme";
export const label = "Actif en Amérique du Sud";
export const type = "checkbox";

export function filter(data: Volcano[]): Volcano[] {
  return [...data]
    .filter((volcano) => volcano.regionGroup === "South America Volcanic Regions")
    .filter((volcano) => volcano.activity === "Eruption Observed");
}
