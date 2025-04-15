import { Volcano } from "../types";

export const id = "ActiveUSA";
export const label = "Actif aux États-Unis";
export const type = "checkbox";

export function filter(data: Volcano[]): Volcano[] {
  return [...data]
    .filter((volcano) => volcano.country === "United States")
    .filter((volcano) => volcano.activity === "Eruption Observed");
}
