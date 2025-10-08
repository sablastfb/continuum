export type SimplePoint = {
  x: number;
  y: number;
};

export type MouseInputPoint = {
  button: number;
  buttons: number;
  movementX: number;
  movementY: number;
  globalX: number;
  globalY: number;
  pointerId: number;
} & SimplePoint;
