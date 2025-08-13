import { keyBy } from "lodash";
import { Thicknes, ThicknesId } from "../types/CanvasTypes";
import { ThicknesConstants } from "../constants/ThicknesConstants";

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
