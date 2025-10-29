import { throttle } from "lodash";
import { Graphics } from "pixi.js";
import { InputState } from "../input/InputState";
import { Continuum_Canvas } from "../CanvasApp";

export class CursorManager {
  public cursor: Graphics;
  constructor() {
    this.cursor = new Graphics();
  }

  public updateCursorGraphics() {
    if (Continuum_Canvas.toolManager.currentTool)
      Continuum_Canvas.toolManager.currentTool.updateCursor!();
  }

  public updateCursorVisibilty(visible: boolean) {
    if (this.cursor) {
      this.cursor.visible = visible;
    }
  }

  moveCursor = throttle((e: InputState) => {
    this.cursor.x = e.globalPosition.x;
    this.cursor.y = e.globalPosition.y;
  }, 1);

  public updateCursorState(e: InputState) {
    this.cursor.x = e.globalPosition.x;
    this.cursor.y = e.globalPosition.y;
  }
}
