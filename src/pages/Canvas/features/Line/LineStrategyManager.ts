import { Graphics } from "pixi.js";
import { Bezier } from "./BezierCurv";
import { SimplePoint } from "../../Types";
import { SimpleLine } from "./SimpleLine";

export type LineStrategyTypes = "bezier" | "simple";

export type LineUpdate = {
  needNew: boolean;
};

export interface ILine {
  startNewLine<P extends SimplePoint>(e: P): void;
  updateLinePoistion<P extends SimplePoint>(e: P, curve: Graphics): LineUpdate;
}

export namespace Continuum_LineStrategyManager {
  export const lineStrategies: Map<LineStrategyTypes, ILine> = new Map();
  export function registerDefaulStrategyes() {
    const lineStrategies = Continuum_LineStrategyManager.lineStrategies;
    lineStrategies.set("simple", new SimpleLine());
    lineStrategies.set("bezier", new Bezier());
  }

  export function getActiveStrategy(lineStrategyTypes: LineStrategyTypes) {
    return (
      Continuum_LineStrategyManager.lineStrategies.get(lineStrategyTypes) ??
      null
    );
  }
}
