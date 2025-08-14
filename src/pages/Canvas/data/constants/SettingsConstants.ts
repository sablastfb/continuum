import { defaultBackgroundColor } from "./CanvasConstants";
import { CanvasSettings } from "../types/CanvasTypes";

export const DefaultSettings: CanvasSettings = {
  background: {
    type: "grid",
    color: defaultBackgroundColor,
    grid: {
      bacgroundColor: defaultBackgroundColor,
      gridColor: "bgt-1",
      size: 5,
      width: 10,
    },
    dots: {
      bacgroundColor: defaultBackgroundColor,
      dotColor: "bgt-1",
      radius: 1.5,
      width: 25,
    },
    line: {
      bacgroundColor: defaultBackgroundColor,
      lineColor: "bgt-1",
      width: 25,
    },
    backgroundColors: ["bg-1", "bg-2", "bg-3", "bg-5"],
  },
  pencile: {
    colors: ['p-7', "p-1", "p-2", "p-5", "p-4"],
    thicknes: ['th-1', 'th-2', 'th-3'],
  },
  theme: "dark",
  layout: {
    toolMenue: "right",
    toolButtons: "top"
  }
};