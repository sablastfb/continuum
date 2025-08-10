import { CanvasSettings } from "./CanvasTypes";

const defaultBackgroundColor = "#231F20";

export const DefaultSettings: CanvasSettings = {
  background:  {
    type: "color",
    color: defaultBackgroundColor,
    grid: {
      bacgroundColor: defaultBackgroundColor,
      gridColor: "white",
      size: 5,
      width: 10
    },
    dots: {
      bacgroundColor: defaultBackgroundColor,
      dotColor: "white",
      radius: 0,
      width: 0
    },
    line: {
      bacgroundColor: defaultBackgroundColor,
      lineColor: "white",
      width: 0
    }
  },
  pencile: {
    colors: [
      "rgb(220,182,183)",
      "rgb(210,245,214)",
      "rgb(215,201,235)",
      "rgb(255,240,199)",
      "rgb(185,222,240)",
    ],
    thicknes: [5, 8, 16],
  },
};
