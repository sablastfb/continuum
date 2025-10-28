import { throttle } from "lodash";
import { FederatedPointerEvent, Graphics } from "pixi.js";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { InputState } from "../input/InputState";

export namespace Continuum_CanvasCursor {
  export let cursor: Graphics;
  export function init() {
    Continuum_CanvasCursor.cursor = new Graphics();
  }

  export function updateCursorGraphics() {
    Continuum_ToolManager.updateCursor();
  }

  export function updateCursorVisibilty(visible: boolean) {
    if (Continuum_CanvasCursor.cursor) {
      Continuum_CanvasCursor.cursor.visible = visible;
    }
  }

  export const moveCursor = throttle((e: InputState) => {
    Continuum_CanvasCursor.cursor.x = e.globalPosition.x;
    Continuum_CanvasCursor.cursor.y = e.globalPosition.y;
  }, 1);

  export function updateCursorState(e: InputState) {
    if (e.pointerOwer) {
      Continuum_CanvasCursor.cursor.visible = true;
      Continuum_CanvasCursor.cursor.x = e.globalPosition.x;
      Continuum_CanvasCursor.cursor.y = e.globalPosition.y;
    } else {
      Continuum_CanvasCursor.cursor.visible = false;
    }
  }
}
