import { Filter, GlProgram } from "pixi.js";
import standardVetex from "./shaders/shape/shape.vert?raw";
import gridShapeShader from "./shaders/shape/shape.frag?raw";
import { Continuum_Canvas } from "../../CanvasApp";
import { ShaderUtils } from "./ShaderUtils";

export type ContinumShader = {
  filter: Filter;
  id: number;
};

export class ShapeShaderService {
  private lastId = 0;
  private shapeShaders: ContinumShader[] = [];
  private shapeGlProgram = GlProgram.from({
    vertex: standardVetex,
    fragment: gridShapeShader,
  });

  public createShapeShader() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    
    /// will update to my needs 
    const shapeResurces = {
      uniforms: {
        iResolution: {
          value: [window.innerWidth, window.innerHeight],
          type: "vec2<f32>",
        },
        viewportZoom: {
          value: Continuum_Canvas.viewportManager.viewport.scale.x,
          type: "f32",
        },
        uBackgroundColor: {
          value: [0, 0, 0],
          type: "vec3<f32>",
        },
        uGridSize: {
          value: 15,
          type: "f32",
        },
        uLineWidth: {
          value: 0.04,
          type: "f32",
        },

        uGridColor: {
          value: [0.5, 0, 0],
          type: "vec3<f32>",
        },
        uOpacity: {
          value: 0.5,
          type: "f32",
        },
      },
    };

    const filter = new Filter({
      glProgram: this.shapeGlProgram,
      resources: shapeResurces,
    });
    
    const shader = {
      filter,
      id: this.lastId++,
    } as ContinumShader;
    this.shapeShaders.push(shader);
    return shader;
  }

  public updateShapeSize(shader: Filter){

  }

  public updateShaderColor(shader: Filter, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }
}
