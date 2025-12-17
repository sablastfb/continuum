import { Filter, GlProgram } from "pixi.js";
import standardVetex from "./shaders/bacground/bacground.vert?raw";
import bacgrounShader from "./shaders/bacground/bacground.frag?raw";
import { Continuum_Canvas } from "../../CanvasApp";
import useBackgroundStore, {
  BackgroundPatternType,
} from "../../../data/store/BackgroundStore.ts";
import { ShaderUtils } from "./ShaderUtils";

export class BackgroundShaderService {
  private backgroundShader?: Filter;

  private backgroundGlPrograms = GlProgram.from({
    vertex: standardVetex,
    fragment: bacgrounShader,
  });

  private patternMapper: Record<BackgroundPatternType, number> = {
    color: 0,
    dots: 1,
    grid: 2,
    line: 3,
  };

  public createBackgroundShader() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    const backgroundResources = {
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
        backgroundColor: {
          value: [0, 0, 0],
          type: "vec3<f32>",
        },
        patternId: {
          value: 0,
          type: "f32",
        },
        showAxis: {
          value: useBackgroundStore.getState().mainAxisVisible,
          type: "f32",
        },
      },
    };
    const filter = new Filter({
      glProgram: this.backgroundGlPrograms,
      resources: backgroundResources,
    });
    this.backgroundShader = filter;
    return filter;
  }

  public getBackgroundShader() {
    if (this.backgroundShader) return this.backgroundShader;
    return this.createBackgroundShader()!;
  }

  public updateBackgroundType(pattern: BackgroundPatternType) {
    if (this.backgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;
      uniforms.patternId = this.patternMapper[pattern];
    }
  }

  public updateBackgroundUniforms() {
    if (this.backgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;
      uniforms.viewportPosition = [
        Continuum_Canvas.viewportManager.viewport.corner.x,
        Continuum_Canvas.viewportManager.viewport.corner.y,
      ];
      uniforms.viewportZoom = Continuum_Canvas.viewportManager.viewport.scale.x;
      uniforms.iResolution = [window.innerWidth, window.innerHeight];
    }
  }

  public updateMainAxes(visible: boolean) {
    if (!this.backgroundShader) return;
    const uniforms = this.backgroundShader.resources.uniforms.uniforms;
    uniforms.showAxis = visible;
  }

  public updateShaderColor(color: string) {
    if (this.backgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.backgroundShader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }
}
