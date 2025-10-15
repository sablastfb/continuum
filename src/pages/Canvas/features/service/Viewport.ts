import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";
import { Continuum_CanvasCursor } from "../cursor/CursorManager";
import { Continuum_ResizeService } from "./Resize";
import { Continuum_CanvasBacground } from "./Background";
import { Continuum_ToolManager } from "../tools/ToolManager";
import { Geometry, GlProgram, Mesh, Shader } from "pixi.js";

import fragment from "./../shaders/shader.frag?raw";
import vertex from "./../shaders/shader.vert?raw";

export namespace Continuum_CanvasViewport {
  export const viewport: Viewport | null = null;

  export function init() {
    if (!Continuum_Canvas.appInstance) return;
    Continuum_CanvasViewport.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance.renderer.events,
      passiveWheel: true,
    });

    // test();
  }
  export let shader: Shader;
  export function test() {
    const fragmentShader = fragment;
    const vertexShader = vertex;

    const geometry = new Geometry({
      attributes: {
        aVertexPosition: {
          buffer: new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1]),
          size: 2,
        },
      },
      indexBuffer: new Uint16Array([0, 1, 2, 0, 2, 3]),
    });

    const program = new GlProgram({
      vertex: vertexShader,
      fragment: fragmentShader,
    });

    shader = new Shader({
      glProgram: program,
      resources: {
        uniforms: {
          resolution: { value: [100, 100], type: "vec2<f32>" },
          cursor: { value: [400.0, 100.0], type: "vec2<f32>" },
        },
      },
    });

    // Create mesh and add to stage
    const redSquare = new Mesh({
      geometry: geometry,
      shader: shader,
    });

    viewport?.addChild(redSquare);
  }

  export function testZoom(zoom: number) {}

  export function setUpViewportAndEvent() {
    if (viewport === null) return;
    viewport
      .drag({ mouseButtons: "middle" })
      .pinch({
        noDrag: true,
      })
      .wheel();
    viewport
      .on("touchstart", (e) => {
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointerdown", (e) => {
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("touchmove", (e) => {
        Continuum_ToolManager.draw(e);
        Continuum_CanvasCursor.moveCursor(e);
      })
      .on("pointerdown", (e) => {
        if (Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = true;
        Continuum_ToolManager.startDrawing(e);
      })
      .on("pointermove", (e) => {
        Continuum_ToolManager.draw(e);
        Continuum_CanvasCursor.moveCursor(e);
      })
      .on("pointerup", (e) => {
        if (!Continuum_Canvas.drawing) return;
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("pointerupoutside", (e) => {
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("pointerout", (e) => {
        Continuum_Canvas.drawing = false;
        Continuum_ToolManager.stopDrawing(e);
      })
      .on("zoomed", (e) => {
        Continuum_ResizeService.viewportZoom(e);
        testZoom(e?.viewport.scale.x);
      })
      .on("moved", () => {
        if (
          Continuum_CanvasBacground.backgroundTilingSprite &&
          viewport?.scale.x
        ) {
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.x =
            viewport?.x;
          Continuum_CanvasBacground.backgroundTilingSprite.tilePosition.y =
            viewport?.y;
        }
      });
  }
}
