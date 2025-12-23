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
    const worldCenterX = this.viewport.worldWidth / 2;
    const worldCenterY = this.viewport.worldHeight / 2;
    this.viewport.moveCenter(worldCenterX, worldCenterY);

    this.viewport
      .drag({ mouseButtons: "middle" })
      .pinch({ noDrag: true })
      .wheel();

    this.viewport
      .on("zoomed", (e) => {
        Continuum_Canvas.resizeService.viewportZoom(e);
      })
      .on("moved", () => {
        Continuum_Canvas.backgroundShaderService.updateBackgroundUniforms();
        Continuum_Canvas.shapeShaderService.updateAllShadersSize();
      });

      this.test();
  }

  //TODO REMOVE THIS
  public async test(){
    // const g =await CurveGenerator.TexturedCurve();
    // this.viewport?.addChild(g);
  }
}
