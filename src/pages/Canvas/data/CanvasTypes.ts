export type Point = {
  x: number;
  y: number;
};

export type ActiveTool =
  | "drawing"
  | "eraser"
  | "move"
  | "selection"
  | "square"
  | "circle"
  | "text";
