import { Volcano } from "../types";

export const id = "All";
export const label = "Tous";
export const type = "checkbox";

export function filter(data: Volcano[]): Volcano[] {
  return data;
}
