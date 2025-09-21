import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Continuum_ToolManager } from "../tools/ToolManager";

export namespace Continuum_CanvasCursor {
  export let cursor: Graphics;
  export function init() {
    Continuum_CanvasCursor.cursor = new Graphics();
  }

  export function updateCursor() {
    Continuum_ToolManager.updateCursor();
  }

  export function updateCursorVisibilty(visible: boolean) {
    if (Continuum_CanvasCursor.cursor) {
      Continuum_CanvasCursor.cursor.visible = visible;
    }
  }

  export const moveCursor = throttle((e: FederatedPointerEvent) => {
    Continuum_CanvasCursor.cursor.x = e.global.x;
    Continuum_CanvasCursor.cursor.y = e.global.y;
  }, 1);

}
