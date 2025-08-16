import { keyBy } from "lodash";
import { PaletContainer } from "../constants/PaletConstants";
import useSettingsStore from "../store/SettingsStore";

export type Color = string;
export type ColorId = (typeof PaletContainer)[number]["id"];

export namespace CanvasPalet {
  export const colorContainer = keyBy(PaletContainer, "id");

  export function getColor(colorId: ColorId) {
    const color = colorContainer[colorId];
    if (color === undefined) return "";

    if (useSettingsStore.getState().theme === "dark") {
      return color.dark;
    } else {
      return color.light;
    }
  }

  export function setColor(colorId: ColorId, color: string) {
    colorContainer[colorId] = { id: colorId, light: color, dark: color };
  }
}
