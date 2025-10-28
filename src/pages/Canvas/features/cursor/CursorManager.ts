import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { InputState } from "../input/InputState";

export class CursorManager {
  public cursor: Graphics;
  constructor() {
    this.cursor = new Graphics();
  }

  public updateCursorGraphics() {
    Continuum_ToolManager.updateCursor();
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
    if (e.pointerOwer) {
      this.cursor.visible = true;
      this.cursor.x = e.globalPosition.x;
      this.cursor.y = e.globalPosition.y;
    } else {
      this.cursor.visible = false;
    }
  }
}
