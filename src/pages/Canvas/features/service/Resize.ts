import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/types/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasViewport } from "./Viewport";
export namespace Continuum_ResizeService {

  export function manualZoom(zoomeDirection: number) {
    if ( Continuum_Canvas.viewportManager.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
     Continuum_Canvas.viewportManager.viewport.setZoom(zomeValue, true);
  }

  export function viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);

      // HERE I CHANGE bacground 
  }
  export function move(){
      
  }

  export function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  export function handleResize() {
    if (!Continuum_Canvas.appInstance || ! Continuum_Canvas.viewportManager.viewport)
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
  }
}
