import {keyBy} from "lodash";
import {ThicknessConstants} from "./ThicknessConstants.ts";

export type Thickness = number;
export type ThicknessId = (typeof ThicknessConstants)[number]["id"];

export class ThicknessPalette {
  public thicknessContainer = keyBy(ThicknessConstants, "id");

  public getThickness(thicknessId: ThicknessId) {
    const thickness = this.thicknessContainer[thicknessId];
    if (thickness === undefined) return 0;
    return thickness.thickness;
  }

  public setThickness(id: ThicknessId, thickness: Thickness) {
    this.thicknessContainer[id] = { id, thickness };
  }
}
