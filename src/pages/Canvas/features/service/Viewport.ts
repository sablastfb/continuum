import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasCursor } from "../cursor/CursorManager";
import { Continuum_ResizeService } from "./Resize";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { Geometry, GlProgram, Mesh, Shader } from "pixi.js";
import { Continuum_InputState } from "../input/InputState";

export namespace Continuum_CanvasViewport {
  export let viewport: Viewport | null = null;

  export function init() {
    if (!Continuum_Canvas.appInstance) return;
    Continuum_CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance.renderer.events,
      passiveWheel: true,
    });
  }

  export function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport
      .drag({ mouseButtons: "middle" })
      .pinch({
        noDrag: true,
      })
      .wheel();
    viewport
      .on("pointerdown", (e) => {
        Continuum_Canvas.continuumInputState.mouseDown(e);
      })
      .on("pointermove", (e) => {
        Continuum_Canvas.continuumInputState.mouseMove(e);
      })
      .on("pointerup", (e) => {
        Continuum_Canvas.continuumInputState.mouseUp(e);
      })
      .on("zoomed", (e) => {})
      .on("moved", () => {});
  }
}
