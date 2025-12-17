import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../../../constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";

export class ResizeService {
  public manualZoom(zoomDirection: number) {
    if (Continuum_Canvas.viewportManager.viewport === null) return;
    const zoom = useCanvasStore.getState().zoom;
    const zomeValue = zoom + zoomDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoom + zoomDirection * ZoomSensitivity);
    Continuum_Canvas.viewportManager.viewport.setZoom(zomeValue, true);
    this.handleResize();
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
    Continuum_Canvas.backgroundService.resize();
  }
}
