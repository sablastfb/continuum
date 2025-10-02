import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasBacground } from "./Background";
import { Continuum_CanvasViewport } from "./Viewport";
import useSettingsStore from "../../data/store/BacgroundStore";

export namespace Continuum_ResizeService {
  export function manualZoom(zoomeDirection: number) {
    if (Continuum_CanvasViewport.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    Continuum_CanvasViewport.viewport.setZoom(zomeValue);
    if (
      Continuum_CanvasBacground.backgroundTilingSprite &&
      Continuum_CanvasViewport.viewport?.scale.x
    ) {
      Continuum_CanvasBacground.backgroundTilingSprite.tileScale.x =
        Continuum_CanvasViewport.viewport?.scale.x;
      Continuum_CanvasBacground.backgroundTilingSprite.tileScale.y =
        Continuum_CanvasViewport.viewport?.scale.y;
    }
  }

  export function viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);
    if (
      Continuum_CanvasBacground.backgroundTilingSprite &&
      Continuum_CanvasViewport.viewport?.scale.x
    ) {
        Continuum_CanvasBacground.changeBackground(
          useSettingsStore.getState().background
        );

      // Continuum_CanvasBacground.backgroundTilingSprite.tileScale.x =
      //   Continuum_CanvasViewport.viewport?.scale.x;
      // Continuum_CanvasBacground.backgroundTilingSprite.tileScale.y =
      //   Continuum_CanvasViewport.viewport?.scale.y;
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

    if (Continuum_CanvasBacground.backgroundTilingSprite) {
      Continuum_CanvasBacground.backgroundTilingSprite.width = window.innerWidth;
      Continuum_CanvasBacground.backgroundTilingSprite.height = window.innerHeight;
    }
  }
}
