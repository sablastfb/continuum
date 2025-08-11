import { Color, ColorId } from "../container/PaletContainer";

type ColorLine = { id: ColorId; light: Color; dark: Color };
export const PaletContainer: ColorLine[] = [
  { id: "pencil_red", light: "rgb(255, 59, 48)", dark: "rgb(255, 69, 58)" },
  {
    id: "pencil_orange",
    light: "rgb(255, 149, 0)",
    dark: "rgb(255, 159, 10)",
  },
  {
    id: "pencil_yellow",
    light: "rgb(255, 204, 0)",
    dark: "rgb(255, 214, 10)",
  },
  { id: "pencil_green", light: "rgb(52, 199, 89)", dark: "rgb(48, 209, 88)" },
  { id: "pencil_blue", light: "rgb(0, 122, 255)", dark: "rgb(10, 132, 255)" },
  {
    id: "pencil_purple",
    light: "rgb(175, 82, 222)",
    dark: "rgb(191, 90, 242)",
  },
  { id: "pencil_pink", light: "rgb(255, 45, 85)", dark: "rgb(255, 55, 95)" },
  {
    id: "pencil_teal",
    light: "rgb(90, 200, 250)",
    dark: "rgb(100, 210, 255)",
  },
  {
    id: "pencil_brown",
    light: "rgb(162, 132, 94)",
    dark: "rgb(172, 142, 104)",
  },
  { id: "pencil_black", light: "rgb(0, 0, 0)", dark: "rgb(255, 255, 255)" },

  // Background Colors
  { id: "bg_white", light: "rgb(255, 255, 255)", dark: "rgb(0, 0, 0)" },
  {
    id: "bg_lightGray",
    light: "rgb(242, 242, 247)",
    dark: "rgb(28, 28, 30)",
  },
  { id: "bg_warmGray", light: "rgb(250, 240, 230)", dark: "rgb(40, 35, 30)" },
  { id: "bg_coolGray", light: "rgb(240, 240, 245)", dark: "rgb(35, 35, 40)" },
  { id: "bg_cream", light: "rgb(255, 253, 245)", dark: "rgb(25, 23, 20)" },
  { id: "bg_sky", light: "rgb(240, 248, 255)", dark: "rgb(10, 20, 30)" },
  {
    id: "bg_parchment",
    light: "rgb(253, 246, 227)",
    dark: "rgb(30, 25, 15)",
  },
];
