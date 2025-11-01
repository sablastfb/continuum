import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";

export class CanvasViewport {
  public viewport: Viewport | null = null;

  constructor() {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance!.renderer.events,
      passiveWheel: true,
    });
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance!.renderer.events,
      passiveWheel: true,
    });
    this.viewport
      .drag({ mouseButtons: "middle" })
      .pinch({ noDrag: true })
      .wheel();

    this.viewport
      .on("zoomed", (e) => {
        Continuum_Canvas.resizeService.viewportZoom(e);
      })
      .on("moved", () => {
        Continuum_Canvas.bacgroundService.updateBackgroundUniforms();
      });
  }
}
