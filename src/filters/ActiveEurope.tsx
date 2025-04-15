import { Volcano } from "../types";

export const id = "ActiveEurope";
export const label = "Actif en europe";
export const type = "checkbox";

export function filter(data: Volcano[]): Volcano[] {
  return [...data]
    .filter((volcano) => volcano.regionGroup === "European Volcanic Regions")
    .filter((volcano) => volcano.activity === "Eruption Observed");
}
