import { SettingsData } from "../store/SettingsStore";

const backgroundColors = ["bg-1", "bg-2", "bg-3", "bg-5"];

export const DefaultSettings: SettingsData = {
  background: {
    activeBacgroundType: "grid",
    color: backgroundColors[0],
    grid: {
      bacgroundColor: backgroundColors[3],
      gridColor: "bgt-1",
      size: 5,
      width: 10,
    },
    dots: {
      bacgroundColor: backgroundColors[0],
      dotColor: "bgt-1",
      radius: 1.5,
      width: 25,
    },
    line: {
      bacgroundColor: backgroundColors[0],
      lineColor: "bgt-1",
      width: 25,
    },
    backgroundColors: backgroundColors,
  },
  theme: "dark",
  layout: {
    toolButtons: "right",
    toolMenue: "top",
  },
};
