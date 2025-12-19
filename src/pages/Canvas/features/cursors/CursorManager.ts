import { Graphics } from "pixi.js";
import { InputState } from "../input/InputState";
import { Continuum_Canvas } from "../CanvasApp";

export class CursorManager {
  public cursorGraphics: Graphics;
  constructor() {
    this.cursorGraphics = new Graphics();
  }

  public updateCursorGraphics() {
    if (Continuum_Canvas.toolManager.currentTool)
      Continuum_Canvas.toolManager.currentTool.updateCursor!();
  }

  public updateCursorVisibility(visible: boolean) {
    if (this.cursorGraphics) {
      this.cursorGraphics.visible = visible;
    }
  }

  public updateCursorPosition(e: InputState) {
    this.cursorGraphics.x = e.globalPosition.x;
    this.cursorGraphics.y = e.globalPosition.y;
    if (Continuum_Canvas.toolManager.currentCursor)
      Continuum_Canvas.toolManager.currentCursor.updateCursor(e);
  }
}
