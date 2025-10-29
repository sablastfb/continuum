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
    
    // Use viewport's actual screen dimensions!
    const viewportScreenWidth = this.viewport!.screenWidth;
    const viewportScreenHeight = this.viewport!.screenHeight;
    
    console.log('Using viewport screen size:', viewportScreenWidth, viewportScreenHeight);
    
    this.backgroundShader = new Filter({
      glProgram: program,
      resources: {
        uniforms: {
          resolution: {
            value: [viewportScreenWidth, viewportScreenHeight],
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
    
    // Size the background to match viewport screen size
    this.backgroundGraphics = new Graphics()
      .rect(0, 0, viewportScreenWidth, viewportScreenHeight)
      .fill("white");
    this.backgroundGraphics.filters = [this.backgroundShader];
    
    Continuum_Canvas.appInstance?.stage?.addChild(this.backgroundGraphics);
    
    if (this.viewport) {
      const originCircle = new Graphics()
        .circle(0, 0, 50)
        .fill({ color: 0xff0000, alpha: 0.3 })
        .stroke({ color: 0xff0000, width: 2 });
      this.viewport.addChild(originCircle);
      
      const testCircle = new Graphics()
        .circle(100, 100, 30)
        .fill({ color: 0x0000ff, alpha: 0.3 })
        .stroke({ color: 0x0000ff, width: 2 });
      this.viewport.addChild(testCircle);
    }
    
    this.updateBackgroundUniforms();
  }

  private updateBackgroundUniforms() {
    if (this.backgroundShader && this.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;

      uniforms.viewportPosition = [
        this.viewport.corner.x,
        this.viewport.corner.y,
      ];

      uniforms.viewportZoom = this.viewport.scale.x;
    }
  }
}
