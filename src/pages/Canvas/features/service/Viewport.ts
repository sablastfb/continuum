import { Viewport } from "pixi-viewport";
import { Canvas } from "./CanvasApp";
import { CanvasCursor } from "./Cursor";
import { CanvasResize } from "./Resize";
import { CanvasBacground } from "./Background";

export namespace CanvasViewport {
  export let viewport: Viewport | null = null;

  export function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport.drag({ mouseButtons: "middle" }).pinch().wheel();
    viewport
      .on("mousedown", (e) => {
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Canvas.toolsManager.getCurrentTool()?.startDrawing(e);
      })
      .on("mousemove", (e) => {
        CanvasCursor.throttledDraw(e);
        CanvasCursor.moveCursor(e);
      })
      .on("mouseup", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Canvas.toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("mouseout", (e) => {
        CanvasCursor.cursor.visible = false;
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Canvas.toolsManager.getCurrentTool()?.stopDrawing(e);
      })
      .on("zoomed", (e) => {
        CanvasResize.viewportZoom(e);
      })
      .on("moved", () => {
        if (CanvasBacground.backgroundTexture && viewport?.scale.x) {
          CanvasBacground.backgroundTexture.tilePosition.x = viewport?.x;
          CanvasBacground.backgroundTexture.tilePosition.y = viewport?.y;
        }
      });
  }
}
