import { Viewport } from "pixi-viewport";
import { Continuum_Canvas } from "../CanvasApp";
import {
  Container,
  Filter,
  Geometry,
  GlProgram,
  GpuProgram,
  Graphics,
  Mesh,
  Shader,
} from "pixi.js";
import fragment from "./../shaders/shader.frag?raw";
import vertex from "./../shaders/shader.vert?raw";
export class CanvasViewport {
  public viewport: Viewport | null = null;

  constructor() {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance!.renderer.events,
      passiveWheel: true,
    });
    this.viewport
      .drag({ mouseButtons: "middle" })
      .pinch({
        noDrag: true,
      })
      .wheel();
    this.viewport
      .on("zoomed", (e) => {
        Continuum_Canvas.resizeService.viewportZoom(e);
      })
      .on("moved", () => {});

    // this.test();
  }

  private test() {
     const fragmentShader = fragment;
    const vertexShader = vertex;


    const program = new GlProgram({
      vertex: vertexShader,
      fragment: fragmentShader,
    });

    const shader = new Filter({
      glProgram: program,
      resources: {
        uniforms: {
          resolution: { value: [100, 100], type: "vec2<f32>" },
          cursor: { value: [400.0, 100.0], type: "vec2<f32>" },
        },
      },
    });

    // Create mesh and add to stage
    const redSquare = new Graphics().rect(0,0,500, 500).fill("white");
    redSquare.filters = [shader];
    this.viewport?.addChild(redSquare);
  }
}
