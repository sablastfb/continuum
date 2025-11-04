import { Filter, GlProgram, Graphics } from "pixi.js";
import standardVetex from "./../shaders/shader.vert?raw";
import gridShapeShader from "./../shaders/shape.frag?raw";
import bacgrounShader from "./../shaders/bacground.frag?raw";
import { Continuum_Canvas } from "../CanvasApp";
import useBacgroundStore from "../../data/store/BacgroundStore";

export type ShaderType = "bacground" | "shape";
export type BacgroundShaders = "simpleGridShader" | "dotShader" |  "gridScale";
export type ShapeShaders = "dotShader" |  "gridScale";

export type ContinumShader = {
  filter: Filter;
  shaderType: ShaderType;
  id: number;
};

export class ShaderService {
  private lastId = 0;
  private shaders: ContinumShader[] = [];
  private glProgrmas: { [key in ShaderType]: GlProgram } = {
    bacground: GlProgram.from({
      vertex: standardVetex,
      fragment: bacgrounShader,
    }),
    shape: GlProgram.from({
      vertex: standardVetex,
      fragment: gridShapeShader,
    }),
  };

  public getNewShader(
    shaderType: ShaderType,
    updateType: ShaderType,
  ) {
    const glProgram = this.glProgrmas[shaderType];
    const resources = this.gerResources(updateType);
    const filter = new Filter({
      glProgram,
      resources,
    });
    const shader = {
      filter,
      shaderType: updateType,
      id: this.lastId++,
    } as ContinumShader;
    this.shaders.push(shader);
    return shader;
  }

  public gerResources(shaderType: ShaderType) {
    if (
      shaderType === "bacground" &&
      Continuum_Canvas.viewportManager.viewport
    ) {
      return {
        uniforms: {
          iResolution: {
            value: [window.innerWidth, window.innerHeight],
            type: "vec2<f32>",
          },
          viewportPosition: {
            value: [
              Continuum_Canvas.viewportManager.viewport.corner.x,
              Continuum_Canvas.viewportManager.viewport.corner.y,
            ],
            type: "vec2<f32>",
          },
          viewportZoom: {
            value: Continuum_Canvas.viewportManager.viewport.scale.x,
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
          shaderType: {
            value: 0,
            type: "f32",
          },
          showAxis: {
            value: useBacgroundStore.getState().mainAxisVisible,
            type: "f32",
          },
          minZoomForGrid: { value: 0.5, type: "f32" },
        },
      };
    } else {
      if (Continuum_Canvas.viewportManager.viewport) {
        return {
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
              value: [127, 127, 127],
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
      }
    }
  }

  public updateUniforms() {
    for (const obj of this.shaders) {
      const shader = obj.filter;
      if (obj.shaderType === "bacground") {
        if (shader && Continuum_Canvas.viewportManager.viewport) {
          const uniforms = shader.resources.uniforms.uniforms;
          uniforms.viewportPosition = [
            Continuum_Canvas.viewportManager.viewport.corner.x,
            Continuum_Canvas.viewportManager.viewport.corner.y,
          ];
          uniforms.viewportZoom =
            Continuum_Canvas.viewportManager.viewport.scale.x;
          uniforms.shapeOffset = [0, 0];
        }
      }
    }
  }

  public updateMainAxises(continumShader: ContinumShader, visible: boolean) {
    if (continumShader.shaderType === "bacground") {
      const uniforms = continumShader.filter.resources.uniforms.uniforms;
      uniforms.showAxis = visible;
    }
  }

  public updateShaderColor(shader: Filter, color: string) {
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.backgroundColor = this.rgbStringToVec3(color);
    }
  }

  private rgbStringToVec3(rgbString: string): [number, number, number] {
    const match = rgbString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/
    );
    if (!match) {
      throw new Error("Invalid RGB string format");
    }

    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;

    return [r, g, b];
  }
}
