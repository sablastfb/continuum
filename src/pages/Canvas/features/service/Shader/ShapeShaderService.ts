import { Filter, GlProgram } from "pixi.js";
import standardVetex from "./shaders/shape/shape.vert?raw";
import gridShapeShader from "./shaders/shape/shape.frag?raw";
import { Continuum_Canvas } from "../../CanvasApp";
import { ShaderUtils } from "./ShaderUtils";
import { SimplePoint } from "../../../data/types/PointTypes";

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
        uBackgroundColor: {
          value: [0.1, 0.1, 0.12], // Dark background
          type: "vec3<f32>",
        },
        uGridColor: {
          value: [1.0, 0.0, 0.0], // Red grid lines
          type: "vec3<f32>",
        },
        uGridSize: {
          value: 20.0, // Grid cell size in pixels
          type: "f32",
        },
        uLineWidth: {
          value: 1.0, // Line width in pixels
          type: "f32",
        },
        uOpacity: {
          value: 0.7, // Grid line opacity
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

  public updateShapeSize(shader: Filter, size: SimplePoint) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      // uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }

  public updateShaderColor(shader: Filter, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }
}
