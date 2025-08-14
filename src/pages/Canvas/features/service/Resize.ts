import { ZoomSensitivity } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Canvas } from "../CanvasApp";
import { CanvasBacground } from "./Background";

export namespace CanvasResize {
  export function zoom(zoomeDirection: number) {
    if (Canvas.viewport === null) return;
    const zoome = useCanvasStore.getState().zoome;
    const zomeValue = zoome + zoomeDirection * ZoomSensitivity;
    useCanvasStore.getState().setZoom(zoome + zoomeDirection * ZoomSensitivity);
    Canvas.viewport.setZoom(zomeValue);
    if (CanvasBacground.backgroundTexture && Canvas.viewport?.scale.x) {
      CanvasBacground.backgroundTexture.tileScale.x = Canvas.viewport?.scale.x;
      CanvasBacground.backgroundTexture.tileScale.y = Canvas.viewport?.scale.y;
    }
  }

  export function setUpResize() {
    window.addEventListener("resize", handleResize);
    handleResize();
  }

  export function handleResize() {
    if (!Canvas.appInstance || !Canvas.viewport) return;
    Canvas.viewport.resize(window.innerWidth, window.innerHeight, 1024, 1024);
    if (CanvasBacground.backgroundTexture) {
      CanvasBacground.backgroundTexture.width = window.innerWidth;
      CanvasBacground.backgroundTexture.height = window.innerHeight;
    }
  }
}
