import { keyBy } from "lodash";
import { PaletContainer } from "./PaletConstants";
import useGlobalStore from "../store/GlobalStore";

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];

export class ColorPalet {
  public colorContainer = keyBy(PaletContainer, "id");

  public getColor(colorId: ColorId) {
    const color = this.colorContainer[colorId];
    if (color === undefined) return "";

    if (useGlobalStore.getState().theme === "dark") {
      return color.dark;
    } else {
      return color.light;
    }
  }

  public setColor(colorId: ColorId, color: string) {
    this.colorContainer[colorId] = { id: colorId, light: color, dark: color };
  }
}
