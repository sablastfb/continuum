import useCanvasStore from "../store/CanvasStore";

export type ColorId = string;
export type Color = string;

export namespace CanvasPalet {
  export const colorContainer: Map<ColorId, { light: Color; dark: Color }> =
    new Map();

  export function GetColor(colorId: ColorId) {
    const color = colorContainer.get(colorId);
    if (useCanvasStore().canvasSettings.theme === "dark") {
      return color?.dark;
    } else {
      return color?.light;
    }
  }
  export function setUpPalet(){

  }
}
