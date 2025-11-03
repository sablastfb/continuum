import { Filter, GlProgram, Graphics } from "pixi.js";
import dotShader from "./../shaders/background/dotShader.frag?raw";
import simpleGrid from "./../shaders/background/simpleGrid.frag?raw";
import standardVetex from "./../shaders/shader.vert?raw";
import gridShapeShader from "./../shaders/shape/gridShape.vert?raw";
import { Continuum_Canvas } from "../CanvasApp";
import { values } from "lodash";
import useBacgroundStore from "../../data/store/BacgroundStore";

export type ShadeType = "grid" | "dot" | "shapeGrid";
export type ShaderUpdateType = "bacground" | "shape";

export type ContinumShader = {
  filter: Filter;
  id: number;
  updateType: ShaderUpdateType;
  shape: Graphics;
};

export class ShaderService {
  private lastId = 0;
  private shaders: ContinumShader[] = [];
  private glProgrmas: { [key in ShadeType]: GlProgram } = {
    grid: GlProgram.from({
      vertex: standardVetex,
      fragment: simpleGrid,
    }),
    dot: GlProgram.from({
      vertex: standardVetex,
      fragment: dotShader,
    }),
    shapeGrid: GlProgram.from({
      vertex: standardVetex,
      fragment: gridShapeShader,
    }),
  };

  public getNewShader(
    shaderType: ShadeType,
    updateType: ShaderUpdateType,
    g?: Graphics
  ) {
    const glProgram = this.glProgrmas[shaderType];
    const resources = this.gerResources(updateType, g);
    const filter = new Filter({
      glProgram,
      resources,
    });
    const shader = {
      filter,
      updateType: updateType,
      id: this.lastId++,
      shape: g,
    } as ContinumShader;
    this.shaders.push(shader);
    return shader;
  }

  public gerResources(shaderType: ShaderUpdateType, g?: Graphics) {
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
          showAxis:  {value: useBacgroundStore.getState().mainAxisVisible, type: "f32"},
          minZoomForGrid: {value: 0.5, type: "f32"}
        },
      };
    } else {
      if (g && Continuum_Canvas.viewportManager.viewport) {
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
            backgroundColor: {
              value: [127, 127, 127],
              type: "vec3<f32>",
            },
          },
        };
      }
    }
  }

  public updateUniforms() {
    for (const obj of this.shaders) {
      const shader = obj.filter;
      if (obj.updateType === "bacground") {
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
      } else if (obj.updateType === "shape" && obj.shape) {
        if (shader && Continuum_Canvas.viewportManager.viewport) {
          const uniforms = shader.resources.uniforms.uniforms;
          // Update viewport position for shapes too
          uniforms.viewportPosition = [
            Continuum_Canvas.viewportManager.viewport.corner.x,
            Continuum_Canvas.viewportManager.viewport.corner.y,
          ];
          uniforms.viewportZoom =
            Continuum_Canvas.viewportManager.viewport.scale.x;

          // Use world coordinates directly
          uniforms.shapeOffset = [obj.shape.x, obj.shape.y];
        }
      }
    }
  }


  public updateMainAxises(continumShader: ContinumShader, visible: boolean){
    if (continumShader.updateType === 'bacground'){
      const uniforms = continumShader.filter.resources.uniforms.uniforms;
      uniforms.showAxis =  visible
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
