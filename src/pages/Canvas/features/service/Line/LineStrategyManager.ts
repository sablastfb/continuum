import { FederatedMouseEvent, Graphics } from "pixi.js";
import { Bezier } from "./BezierCurv";
import { SimpleLine } from "./SimpleLine";

export type LineStrategyTypes = "bezier" | "simple";

export type LineUpdate = {
  needNew: boolean;
};
  type SimplePoint = {
    x: number;
    y: number;
  };
export interface ILine {
  startNewLine<P extends SimplePoint>(e: P): void;
  startLine(): void;
  updateLinePoistion<P extends SimplePoint>(e: P, curve: Graphics): LineUpdate;
}

export class LineStrategyManager {
  private lineStrategies: Map<LineStrategyTypes, ILine> = new Map();

  constructor() {
    this.registerDefaulStrategyes();
  }
  private registerDefaulStrategyes() {
    this.registerDefaulStrategye("bezier", new Bezier());
    // this.registerDefaulStrategye("simple", new SimpleLine());
  }

  private registerDefaulStrategye(toolType: LineStrategyTypes, tool: ILine) {
    this.lineStrategies.set(toolType, tool);
  }

  public getActiveStrategy(lineStrategyTypes: LineStrategyTypes){
    return this.lineStrategies.get(lineStrategyTypes) ?? null;
  }
}
