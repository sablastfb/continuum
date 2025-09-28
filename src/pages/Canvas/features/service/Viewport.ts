import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasCursor } from "../cursor/CursorManager";
import { Continuum_ResizeService } from "./Resize";
import { Continuum_CanvasBacground } from "./Background";
import { Continuum_ToolManager } from "../tools/ToolManager";

export namespace Continuum_CanvasViewport {
  export let viewport: Viewport | null = null;

  export function init() {
    if (!Continuum_Canvas.appInstance) return;
    Continuum_CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance.renderer.events,
      passiveWheel: true,
    });
  }

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
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointerdown", (e) => {
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("touchmove", (e) => {
        Continuum_ToolManager.draw(e);
        Continuum_CanvasCursor.moveCursor(e);
      })
      .on("pointerdown", (e) => {
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointermove", (e) => {
        Continuum_ToolManager.draw(e);
        Continuum_CanvasCursor.moveCursor(e);
      })
      .on("pointerup", (e) => {
        if (!Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("pointerupoutside", (e) => {
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("pointerout", (e) => {
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("zoomed", (e) => {
        Continuum_ResizeService.viewportZoom(e);
      })
      .on("moved", () => {
        if (
          Continuum_CanvasBacground.backgroundTilingSprite &&
          viewport?.scale.x
        ) {
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.x =
            viewport?.x;
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.y =
            viewport?.y;
        }
      });
  }
}
