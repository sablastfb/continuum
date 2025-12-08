import { keyBy } from "lodash";
import { ThicknesConstants } from "./ThicknesConstants";

export type Thicknes = number;
export type ThicknesId = (typeof ThicknesConstants)[number]["id"];

export class ThicknesPalet {
  public thicknesContainer = keyBy(ThicknesConstants, "id");

  public getThicknes(thicknesId: ThicknesId) {
    const thicknes = this.thicknesContainer[thicknesId];
    if (thicknes === undefined) return 0;
    return thicknes.thicknes;
  }

  public setThicknes(id: ThicknesId, thicknes: Thicknes) {
    this.thicknesContainer[id] = { id, thicknes };
  }
}
