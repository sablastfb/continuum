import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasBacground } from "./Background";
import { Continuum_CanvasViewport } from "./Viewport";

export namespace Continuum_ResizeService {
  export function manualZoom(zoomeDirection: number) {
    if (Continuum_CanvasViewport.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    Continuum_CanvasViewport.viewport.setZoom(zomeValue);
    if (
      Continuum_CanvasBacground.backgroundTexture &&
      Continuum_CanvasViewport.viewport?.scale.x
    ) {
      Continuum_CanvasBacground.backgroundTexture.tileScale.x =
        Continuum_CanvasViewport.viewport?.scale.x;
      Continuum_CanvasBacground.backgroundTexture.tileScale.y =
        Continuum_CanvasViewport.viewport?.scale.y;
    }
  }

  export function viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);
    if (
      Continuum_CanvasBacground.backgroundTexture &&
      Continuum_CanvasViewport.viewport?.scale.x
    ) {
      Continuum_CanvasBacground.backgroundTexture.tileScale.x =
        Continuum_CanvasViewport.viewport?.scale.x;
      Continuum_CanvasBacground.backgroundTexture.tileScale.y =
        Continuum_CanvasViewport.viewport?.scale.y;
    }
  }

  export function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  export function handleResize() {
    if (!Continuum_Canvas.appInstance || !Continuum_CanvasViewport.viewport)
      return;
    Continuum_CanvasViewport.viewport.resize(
      window.innerWidth,
      window.innerHeight,
      1024,
      1024
    );
    Continuum_Canvas.appInstance.renderer.resize(
      window.innerWidth,
      window.innerHeight
    );

    if (Continuum_CanvasBacground.backgroundTexture) {
      Continuum_CanvasBacground.backgroundTexture.width = window.innerWidth;
      Continuum_CanvasBacground.backgroundTexture.height = window.innerHeight;
    }
  }
}
