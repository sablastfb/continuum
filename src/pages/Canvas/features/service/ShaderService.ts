import { Filter, GlProgram } from "pixi.js";
import fragment from "./../shaders/shader.frag?raw";
import dotShader from "./../shaders/dotShader.frag?raw";
import vertex from "./../shaders/shader.vert?raw";
import { Continuum_Canvas } from "../CanvasApp";

// loads shaders and mange changing variables like color
export class ShaderService {
  public getDotShader(){
     const fragmentShader = dotShader;
    const vertexShader = vertex;
    const program = GlProgram.from({
      fragment: fragmentShader,
      vertex: vertexShader,
    });
    const shader = new Filter({
      glProgram: program,
      resources: {
        uniforms: {
          iResolution: {
            value: [window.innerWidth, window.innerHeight],
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
          shapeOffset: {
            value: [0, 0],
            type: "vec2<f32>",
          },
          backgroundColor: {
            value: [127, 127, 127],
            type: "vec3<f32>",
          },
        },
      },
    });

    return shader;
  }

  public getGridShader() {
    const fragmentShader = fragment;
    const vertexShader = vertex;
    const program = GlProgram.from({
      vertex: vertexShader,
      fragment: fragmentShader,
    });
    const shader = new Filter({
      glProgram: program,
      resources: {
        uniforms: {
          iResolution: {
            value: [window.innerWidth, window.innerHeight],
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
          shapeOffset: {
            value: [0, 0],
            type: "vec2<f32>",
          },
          backgroundColor: {
            value: [127, 127, 127],
            type: "vec3<f32>",
          },
        },
      },
    });

    return shader;
  }

  public updatePosition(shader: Filter) {
    // if (shader && Continuum_Canvas.viewportManager.viewport) {
    //       const uniforms = shader.resources.uniforms.uniforms;
    //       uniforms.viewportPosition = [
    //         Continuum_Canvas.viewportManager.viewport.corner.x,
    //         Continuum_Canvas.viewportManager.viewport.corner.y,
    //       ];
    //       uniforms.viewportZoom = Continuum_Canvas.viewportManager.viewport.scale.x;
    //     }
  }

  public updateShaderColor(shader: Filter, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;

      uniforms.backgroundColor = this.rgbStringToVec3(color);
    }
  }

  public rgbStringToVec3(rgbString: string): [number, number, number] {
    const match = rgbString.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) {
      throw new Error("Invalid RGB string format");
    }

    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;

    return [r, g, b];
  }
}
