import {keyBy} from "lodash";
import useGlobalStore from "../store/GlobalStore";
import {PenColors} from "./PenColor.ts";
import {BackgroundColors} from "./BacgroundColor.ts";
import {MarkerPalette} from "./MarkerPalette.ts";
import {ShapeColors} from "./ShapeColor.ts";

export type Color = string;
export type ColorId = (typeof PaletteBarrel)[number]["id"];
export const PaletteBarrel = [
    {id: "bgt-1", light: "rgb(123, 123, 123)", dark: "rgb(123, 123, 123)"},
    {id: "c-1", light: "rgb(0, 0, 0)", dark: "rgb(255, 255, 255)"},
    {id: "c-2", light: "rgb(125, 125, 125)", dark: "rgb(125, 125, 125)"},
    ...PenColors,
    ...BackgroundColors,
    ...MarkerPalette,
    ...ShapeColors,
];

export class ColorPalette {
    public colorContainer = keyBy(PaletteBarrel, "id");

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
        this.colorContainer[colorId] = {id: colorId, light: color, dark: color};
    }
}
