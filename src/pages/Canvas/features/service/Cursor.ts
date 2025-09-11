import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Canvas } from "../CanvasApp";

export namespace CanvasCursor {
  export let cursor: Graphics;

  export const throttledDraw = throttle((e: FederatedPointerEvent) => {
    if (Canvas.drawing && e.buttons == 1) {
      Canvas.toolsManager.getCurrentTool()?.draw(e);
    }
  }, 16);

  export function updateCursor() {
    if (Canvas.toolsManager) {
        Canvas.toolsManager.getCurrentTool()?.updateCursor();
    }
  }

  export function updateCursorVisibilty() {
    if (CanvasCursor.cursor) {
      CanvasCursor.cursor.visible = true;
    }
  }

  export const moveCursor = throttle((e: FederatedPointerEvent) => {
    CanvasCursor.cursor.x = e.global.x;
    CanvasCursor.cursor.y = e.global.y;
  }, 8);
}
