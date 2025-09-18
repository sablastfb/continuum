import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Canvas } from "../CanvasApp";
import { Continuum_ToolManager } from "../tools/ToolManager";

export namespace CanvasCursor {
  export let cursor: Graphics;

  export function updateCursor() {
    Continuum_ToolManager.updateCursor();
  }

  export function updateCursorVisibilty() {
    if (CanvasCursor.cursor) {
      CanvasCursor.cursor.visible = true;
    }
  }

  export const throttledDraw = throttle((e: FederatedPointerEvent) => {
    if (Canvas.drawing && e.buttons == 1) {
      Continuum_ToolManager.draw(e);
    }
  }, 16);

  export const moveCursor = throttle((e: FederatedPointerEvent) => {
    CanvasCursor.cursor.x = e.global.x;
    CanvasCursor.cursor.y = e.global.y;
  }, 16);
}
