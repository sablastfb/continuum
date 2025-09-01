import { FederatedMouseEvent, Graphics } from "pixi.js";
import { Bezier } from "./BezierCurv";
import { SimpleLine } from "./SimpleLine";

export type LineStrategyTypes = "bezier" | "simple";

export type LineUpdate = {
  needNew: boolean;
};

export interface ILine {
  startNewLine(): void;
  startLine(): void;
  updateLinePoistion(e: FederatedMouseEvent, curve: Graphics): LineUpdate;
}

export class LineStrategyManager {
  private lineStrategies: Map<LineStrategyTypes, ILine> = new Map();

  constructor() {
    this.registerDefaulStrategyes();
  }
  private registerDefaulStrategyes() {
    this.registerDefaulStrategye("bezier", new Bezier());
    this.registerDefaulStrategye("simple", new SimpleLine());
  }

  private registerDefaulStrategye(toolType: LineStrategyTypes, tool: ILine) {
    this.lineStrategies.set(toolType, tool);
  }

  public getActiveStrategy(lineStrategyTypes: LineStrategyTypes){
    return this.lineStrategies.get(lineStrategyTypes) ?? null;
  }
}
