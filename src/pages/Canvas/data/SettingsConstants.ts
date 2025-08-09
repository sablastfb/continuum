import { CanvasSettings } from "./CanvasStore";

export const DefaultSettings: CanvasSettings = {
  background: {
    type: "color",
    color: "#231F20",
    grid: {},
    dots: {},
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
