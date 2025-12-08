import { Filter, Shader } from "pixi.js";
import { Continuum_Canvas } from "../../CanvasApp";
import { ShaderUtils } from "./ShaderUtils";
import shapeVertex from "../Shader/shaders/shape/shape.vert?raw";
import shapeFragmet from "../Shader/shaders/shape/shape.frag?raw";
import { useShapesStore } from "../../../data/store/ShapeStore";
export type ContinumShader = {
  filter: Filter;
  id: number;
};

export class ShapeShaderService {
  public allShader: Shader[] = [];
  createShader() {
    const shader = Shader.from({
      gl: {
        vertex: shapeVertex,
        fragment: shapeFragmet,
      },
      resources: {
        uniforms: {
          iResolution: { value: [0, 0], type: "vec2<f32>" },
          patternId: { value: 0, type: "f32" },
          lineWidth: { value: useShapesStore.getState().lineWidth, type: "f32" },
          gridSize: { value: useShapesStore.getState().spaceBetweenLines, type: "f32" },
          marginPosition: { value: 0.1, type: "f32" },
          backgroundColor: { value: [0, 0, 0], type: "vec3<f32>" },
          dotRadius:  { value: useShapesStore.getState().dots.dotRadius, type: "f32" },
          viewportZoom: { value:  Continuum_Canvas.viewportManager.viewport!.scale.x, type: "f32" },
        },
      },
    });
    this.allShader.push(shader);
    return shader;
  }

  public updateShapeSize(shader: Shader | null, w: number, h: number) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.iResolution = [w, h];
    }
  }

  public updateShaderColor(shader: Shader | null, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }

    public updateShaderPatter(shader: Shader | null, patterId: number) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.patternId = patterId;
    }
  }

  public updateAllShadersSize() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    this.allShader.forEach((x) => {
      const uniforms = x.resources.uniforms.uniforms;
      uniforms.viewportZoom =
        Continuum_Canvas.viewportManager.viewport!.scale.x;
    });
  }
}
