import { Filter, GlProgram } from "pixi.js";
import standardVetex from "./shaders/bacground/bacground.vert?raw";
import bacgrounShader from "./shaders/bacground/bacground.frag?raw";
import { Continuum_Canvas } from "../../CanvasApp";
import useBacgroundStore, {
  BacgroundPatternType,
} from "../../../data/store/BacgroundStore";
import { ShaderUtils } from "./ShaderUtils";

export class BacgroundShaderService {
  private bacgroundShader?: Filter;

  private bacgroundGlPrograms = GlProgram.from({
    vertex: standardVetex,
    fragment: bacgrounShader,
  });

  private patternMapper: Record<BacgroundPatternType, number> = {
    color: 0,
    dots: 1,
    grid: 2,
    line: 3,
  };

  public createBacgroundShader() {
    if (!Continuum_Canvas.viewportManager.viewport) return;
    const bacgroundResurces = {
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
          value: useBacgroundStore.getState().mainAxisVisible,
          type: "f32",
        },
      },
    };
    const filter = new Filter({
      glProgram: this.bacgroundGlPrograms,
      resources: bacgroundResurces,
    });
    this.bacgroundShader = filter;
    return filter;
  }

  public getBacgroundShader() {
    if (this.bacgroundShader) return this.bacgroundShader;
    return this.createBacgroundShader()!;
  }

  public updateBacgroundType(pattern: BacgroundPatternType) {
    if (this.bacgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.bacgroundShader.resources.uniforms.uniforms;
      uniforms.patternId = this.patternMapper[pattern];
    }
  }

  public updateBacgroundUniforms() {
    if (this.bacgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.bacgroundShader.resources.uniforms.uniforms;
      uniforms.viewportPosition = [
        Continuum_Canvas.viewportManager.viewport.corner.x,
        Continuum_Canvas.viewportManager.viewport.corner.y,
      ];
      uniforms.viewportZoom = Continuum_Canvas.viewportManager.viewport.scale.x;
      uniforms.iResolution = [window.innerWidth, window.innerHeight];
    }
  }

  public updateMainAxises(visible: boolean) {
    if (!this.bacgroundShader) return;
    const uniforms = this.bacgroundShader.resources.uniforms.uniforms;
    uniforms.showAxis = visible;
  }

  public updateShaderColor(color: string) {
    if (this.bacgroundShader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = this.bacgroundShader.resources.uniforms.uniforms;
      uniforms.backgroundColor = ShaderUtils.rgbStringToVec3(color);
    }
  }
}
