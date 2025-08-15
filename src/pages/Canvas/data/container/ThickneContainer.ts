import { keyBy } from "lodash";
import { ThicknesConstants } from "../constants/ThicknesConstants";

export type Thicknes = number;
export type ThicknesId = (typeof ThicknesConstants)[number]["id"];


export namespace ThicknesPalet {
  export const thicknesContainer = keyBy(ThicknesConstants, "id");

  export function getThicknes(thicknesId: ThicknesId) {
    const thicknes = thicknesContainer[thicknesId];
    if (thicknes === undefined) return 0;
    return thicknes.thicknes;
  }

  export function setThicknes(id: ThicknesId, thicknes: Thicknes) {
    thicknesContainer[id] = { id, thicknes };
  }
}
