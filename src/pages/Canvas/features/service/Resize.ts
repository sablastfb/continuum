import { ZoomedEvent } from "pixi-viewport/dist/types";
import { ZoomSensitivity } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Canvas } from "./CanvasApp";
import { CanvasBacground } from "./Background";
import { CanvasViewport } from "./Viewport";

export namespace CanvasResize {
  export function manualZoom(zoomeDirection: number) {
    if (CanvasViewport.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    CanvasViewport.viewport.setZoom(zomeValue);
    if (CanvasBacground.backgroundTexture && CanvasViewport.viewport?.scale.x) {
      CanvasBacground.backgroundTexture.tileScale.x =
        CanvasViewport.viewport?.scale.x;
      CanvasBacground.backgroundTexture.tileScale.y =
        CanvasViewport.viewport?.scale.y;
    }
  }

  export function viewportZoom(e: ZoomedEvent) {
    useCanvasStore.getState().setZoom(e?.viewport.scale.x);
    if (CanvasBacground.backgroundTexture && CanvasViewport.viewport?.scale.x) {
      CanvasBacground.backgroundTexture.tileScale.x =
        CanvasViewport.viewport?.scale.x;
      CanvasBacground.backgroundTexture.tileScale.y =
        CanvasViewport.viewport?.scale.y;
    }
  }

  export function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  export function handleResize() {
    if (!Canvas.appInstance || !CanvasViewport.viewport) return;
    CanvasViewport.viewport.resize(
      window.innerWidth,
      window.innerHeight,
      1024,
      1024
    );
    if (CanvasBacground.backgroundTexture) {
      CanvasBacground.backgroundTexture.width = window.innerWidth;
      CanvasBacground.backgroundTexture.height = window.innerHeight;
    }
  }
}
