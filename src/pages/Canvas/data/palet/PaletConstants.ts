import { BacgroundColors } from "./BacgroundColor";
import { MarkerColors } from "./MarkerColors";
import { PencileColors } from "./PencileColor";
import { ShapeColors } from "./ShapeColor";

export const PaletContainer = [
  { id: "bgt-1", light: "rgb(123, 123, 123)", dark: "rgb(123, 123, 123)" },
  { id: "c-1", light: "rgb(0, 0, 0)", dark: "rgb(255, 255, 255)" },
  { id: "c-2", light: "rgb(125, 125, 125)", dark: "rgb(125, 125, 125)" },
  ...PencileColors,
  ...BacgroundColors,
  ...MarkerColors,
  ...ShapeColors,
];
