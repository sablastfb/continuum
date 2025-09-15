import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum } from "../tools/ToolManager";

export namespace CanvasCursor {
  export let cursor: Graphics;

  export const throttledDraw = throttle((e: FederatedPointerEvent) => {
    if (Canvas.drawing && e.buttons == 1) {
      Continuum.ToolManager.getCurrentTool()!.draw(e);
    }
  }, 16);

  export function updateCursor() {
        Continuum.ToolManager.getCurrentTool().updateCursor();
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
