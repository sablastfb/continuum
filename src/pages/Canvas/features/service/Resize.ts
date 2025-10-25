import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/types/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasBacground } from "./Background";
import { Continuum_CanvasViewport } from "./Viewport";
import { Continuum_TailBacground } from "./TailBackground";

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
        Continuum_CanvasViewport.viewport?.scale.x*Continuum_TailBacground.tailScale;
      Continuum_CanvasBacground.backgroundTilingSprite.tileScale.y =
        Continuum_CanvasViewport.viewport?.scale.y*Continuum_TailBacground.tailScale;
    }
  }

  export function viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);
    if (
      Continuum_CanvasBacground.backgroundTilingSprite &&
      Continuum_CanvasViewport.viewport?.scale.x
    ) {
  Continuum_CanvasBacground.backgroundTilingSprite.tileScale.x =
        Continuum_CanvasViewport.viewport?.scale.x*Continuum_TailBacground.tailScale;
      Continuum_CanvasBacground.backgroundTilingSprite.tileScale.y =
        Continuum_CanvasViewport.viewport?.scale.y*Continuum_TailBacground.tailScale;
    }
  }
  export function move(){
        if (
          Continuum_CanvasBacground.backgroundTilingSprite &&
          Continuum_CanvasViewport.viewport?.scale.x
        ) {
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.x =
            Continuum_CanvasViewport.viewport?.x;
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.y =
            Continuum_CanvasViewport.viewport?.y;
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
      window.innerHeight*0.97
    );

    if (Continuum_CanvasBacground.backgroundTilingSprite) {
      Continuum_CanvasBacground.backgroundTilingSprite.width =
        window.innerWidth*0.5;
      Continuum_CanvasBacground.backgroundTilingSprite.height =
        window.innerHeight;
    }
  }
}
