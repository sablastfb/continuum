import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_ResizeService } from "./Resize";

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
    Continuum_CanvasViewport.viewport
      .drag({ mouseButtons: "middle" })
      .pinch({
        noDrag: true,
      })
      .wheel();
    Continuum_CanvasViewport.viewport
      .on("zoomed", (e) => {
        Continuum_ResizeService.viewportZoom(e);
      })
      .on("moved", () => {});
  }
}
