import { Viewport } from "pixi-viewport";
import { Canvas } from "../CanvasApp";
import { CanvasCursor } from "./Cursor";
import { CanvasResize } from "./Resize";
import { CanvasBacground } from "./Background";
import { Continuum } from "../tools/ToolManager";

export namespace CanvasViewport {
  export let viewport: Viewport | null = null;

  export function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport
      .drag({ mouseButtons: "middle" })
      .pinch({
        noDrag: true,
      })
      .wheel();
    viewport
      .on("touchstart", (e) => {
        const worldPos = e.global;

        console.log(`Finger touch started at: X: ${e.x}, Y: ${e.y}`);
        console.log(
          `Finger touch started at: X: ${worldPos.x}, Y: ${worldPos.y}`
        );
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        // Canvas.toolsManager.getCurrentTool()?.startDrawing(e);
      })
      .on("pointerdown", (e) => {
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Continuum.ToolManager.getCurrentTool().startDrawing(e);
      })
      .on("touchmove", (e) => {
        CanvasCursor.throttledDraw(e);
        CanvasCursor.moveCursor(e);
      })
      .on("pointerdown", (e) => {
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Continuum.ToolManager.getCurrentTool().startDrawing(e);
      })
      .on("pointermove", (e) => {
        CanvasCursor.throttledDraw(e);
        CanvasCursor.moveCursor(e);
      })
      .on("pointerup", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum.ToolManager.getCurrentTool().startDrawing(e);
      })
      .on("pointerupoutside", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum.ToolManager.getCurrentTool().startDrawing(e);
      })
      .on("pointerout", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum.ToolManager.getCurrentTool().startDrawing(e);
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
