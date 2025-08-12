import { keyBy } from "lodash";
import { PaletContainer } from "../constants/PaletConstants";
import useCanvasStore from "../store/CanvasStore";
import { ColorId } from "../types/CanvasTypes";

export namespace CanvasPalet {
  export const colorContainer = keyBy(PaletContainer, "id");

  export function GetColor(colorId: ColorId) {
    const color = colorContainer[colorId];
    if (color === undefined) return "";

    if (useCanvasStore.getState().canvasSettings.theme === "dark") {
      return color.dark;
    } else {
      return color.light;
    }
  }
}
