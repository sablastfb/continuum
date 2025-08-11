import { defaultBackgroundColor } from "./CanvasConstants";
import { CanvasSettings } from "../types/CanvasTypes";

export const DefaultSettings: CanvasSettings = {
  background: {
    type: "color",
    color: defaultBackgroundColor,
    grid: {
      bacgroundColor: defaultBackgroundColor,
      gridColor: "bg-2",
      size: 5,
      width: 10,
    },
    dots: {
      bacgroundColor: defaultBackgroundColor,
      dotColor: "bg-2",
      radius: 1.5,
      width: 25,
    },
    line: {
      bacgroundColor: defaultBackgroundColor,
      lineColor: "bg-2",
      width: 0,
    },
    backgroundColors: ["bg-1", "bg-2", "bg-3"],
  },
  pencile: {
    colors: ["p-1", "p-2", "p-5"],
    thicknes: [5, 8, 16],
  },
  theme: "dark",
};
