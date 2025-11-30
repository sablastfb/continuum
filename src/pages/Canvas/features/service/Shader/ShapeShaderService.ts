import { Filter, Graphics, Shader } from "pixi.js";
import { Continuum_Canvas } from "../../CanvasApp";
import { ShaderUtils } from "./ShaderUtils";
import shapeVertex from "../Shader/shaders/shape/shape.vert?raw";
import shapeFragmet from "../Shader/shaders/shape/shape.frag?raw";
export type ContinumShader = {
  filter: Filter;
  id: number;
};

export class ShapeShaderService {
  createShader() {
      const shader = Shader.from({
      gl: {
        vertex: shapeVertex,
        fragment: shapeFragmet,
      },
      resources: {
        uniforms: {
          iResolution: { value: [0, 0], type: "vec2<f32>" },
          patternId: { value: 0.0, type: "f32" },
          backgroundColor: { value: [0, 0, 0], type: "vec3<f32>" },
        },
      },
    });
    return shader;
  }

  public updateShapeBounds(shader: Filter, graphic: Graphics){
      if (shader && Continuum_Canvas.viewportManager.viewport) {
        const bounds = graphic.getBounds();
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.uObjectBounds  =[
        bounds.x,bounds.y, bounds.width, bounds.height
      ];
    }
  }


  public updateShapeSize(shader: Shader | null, w: number, h: number) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.iResolution = [w,h];
    }
  }

  public updateShaderColor(shader: Shader | null, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }
}
