export type CurveToolType = "pen" | "highlighter";
export type ShapeToolType = "shape";
export type EraserToolType = "eraser";
export type TextToolType = "text";
export type ImageToolType = "text";

export type SelectionToolType =
  | "pan-zoom"
  | "selection-lasso"
  | "selection-square"
  | "screen-shot";

export type ToolType =
  | "base"
  | CurveToolType
  | SelectionToolType
  | ShapeToolType
  | EraserToolType
  | TextToolType
  | ImageToolType;
