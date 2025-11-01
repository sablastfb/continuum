import { Filter, GlProgram } from "pixi.js";
import fragment from "./../shaders/shader.frag?raw";
import vertex from "./../shaders/shader.vert?raw";

// loads shaders and mange changing variables like color
export class ShaderService {
  public getGridShader() {
    debugger;
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
        },
      },
    });

    return shader;
  }
}
