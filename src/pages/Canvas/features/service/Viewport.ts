import { Viewport } from "pixi-viewport";
import { Canvas } from "../CanvasApp";
import { CanvasCursor } from "./Cursor";
import { CanvasResize } from "./Resize";
import { CanvasBacground } from "./Background";
import { Continuum_ToolManager } from "../tools/ToolManager";

export namespace CanvasViewport {
  export let viewport: Viewport | null = null;
  
  export function init() {
    if (!Canvas.appInstance) return;
    CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Canvas.appInstance.renderer.events,
      threshold: 5,
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
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointerdown", (e) => {
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("touchmove", (e) => {
        CanvasCursor.throttledDraw(e);
        CanvasCursor.moveCursor(e);
      })
      .on("pointerdown", (e) => {
        if (Canvas.drawing) return;
        Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointermove", (e) => {
        CanvasCursor.throttledDraw(e);
        CanvasCursor.moveCursor(e);
      })
      .on("pointerup", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointerupoutside", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointerout", (e) => {
        if (!Canvas.drawing) return;
        Canvas.drawing = false;
        Continuum_ToolManager.startDrawing(e);
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
