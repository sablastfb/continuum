export type SimplePoint = {
  x: number;
  y: number;
};

export type MouseInputPoint = {
  button: number;
} & SimplePoint;
