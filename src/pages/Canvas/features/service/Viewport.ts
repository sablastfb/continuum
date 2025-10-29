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
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      events: Continuum_Canvas.appInstance!.renderer.events,
      passiveWheel: true,
    });
    this.viewport
      .drag({ mouseButtons: "middle" })
      .pinch({ noDrag: true })
      .wheel();

    this.viewport
      .on("zoomed", (e) => {
        Continuum_Canvas.resizeService.viewportZoom(e);
      })
      .on("moved", () => {
        this.updateBackgroundUniforms();
      });
    this.test();
  }

  private backgroundShader: Filter | null = null;
  private backgroundGraphics: Graphics | null = null;

  private test() {
    const fragmentShader = fragment;
    const vertexShader = vertex;
    const program = GlProgram.from({
      vertex: vertexShader,
      fragment: fragmentShader,
    });
    this.backgroundShader = new Filter({
      glProgram: program,
      resources: {
        uniforms: {
          resolution: {
            value: [500, 500],
            type: "vec2<f32>",
          },
          viewportPosition: {
            value: [0, 0],
            type: "vec2<f32>",
          },
          viewportZoom: {
            value: 1.0,
            type: "f32",
          },
        },
      },
    });
    // Create full-screen background
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, window.innerWidth, window.innerHeight)
      .fill("white");
    this.backgroundGraphics.filters = [this.backgroundShader];
    // Add to stage (not viewport) so it stays full-screen
    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    if (this.viewport)
      this.viewport?.addChild(
        new Graphics()
          .circle(this.viewport!.x, this.viewport!.y, 100)
          .fill("red")
      );
  }

  private updateBackgroundUniforms() {
    if (this.backgroundShader && this.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;

      uniforms.viewportPosition = [
        -this.viewport.x / this.viewport.scale.x,
        -this.viewport.y / this.viewport.scale.y,
      ];

      uniforms.viewportZoom = this.viewport.scale.x; // assuming uniform zoom
    }
  }
}
