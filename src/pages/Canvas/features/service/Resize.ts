import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";

export class ResizeService {
  public manualZoom(zoomeDirection: number) {
    if (Continuum_Canvas.viewportManager.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    Continuum_Canvas.viewportManager.viewport.setZoom(zomeValue, true);
  }

  public viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);
  }
  constructor() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  public handleResize() {
    if (
      !Continuum_Canvas.appInstance ||
      !Continuum_Canvas.viewportManager.viewport
    )
      return;
    Continuum_Canvas.viewportManager.viewport.resize(
      window.innerWidth,
      window.innerHeight,
      1024,
      1024
    );
    Continuum_Canvas.appInstance.renderer.resize(
      window.innerWidth,
      window.innerHeight
    );
    // bacground
    
    Continuum_Canvas.bacgroundService?.backgroundGraphics?.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
}
