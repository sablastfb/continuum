import { earcut, Mesh, MeshGeometry, Shader } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";

export class MeshCreator {
  shader = Shader.from({
    gl: {
      vertex: `
      attribute vec2 aPosition;
      attribute vec2 aUV;
      
      uniform mat3 uProjectionMatrix;
      uniform mat3 uWorldTransformMatrix;
      uniform mat3 uTransformMatrix;
      
      varying vec2 vUV;
      
      void main() {
        mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
        gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
        vUV = aUV;
      }
    `,
      fragment: `
      precision mediump float;
      varying vec2 vUV;
      
      void main() {
        gl_FragColor = vec4(vUV.x, vUV.y, 0.0, 1.0);
      }
    `,
    },
    resources: {
      shaderToyUniforms: {
        iResolution: { value: [640, 360, 1], type: "vec3<f32>" },
        iTime: { value: 0, type: "f32" },
      },
    },
  });

  public createRoundedRectangle() {
    const geometry = this.rectangleGeometry();
    return new Mesh({ geometry, shader: this.shader });
  }

  private rectangleGeometry() {
    const positions = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
    const indices = earcut(positions);
    const uvs = [];
    for (let i = 0; i < positions.length; i += 2) {
      uvs.push(positions[i], positions[i + 1]);
    }
    return new MeshGeometry({
      positions,
      uvs: new Float32Array(uvs),
      indices: new Uint32Array(indices),
    });
  }

  private circleGeometry(n: number = 100) {
    if (!Continuum_Canvas.appInstance) return;
    Continuum_Canvas.appInstance.ticker.add(() => {
      this.shader.resources.shaderToyUniforms.uniforms.iTime +=
        Continuum_Canvas.appInstance!.ticker.elapsedMS / 1000;
    });

    const coords = [];
    for (let i = 0; i < n; i += 1) {
      const alpha = (i / n) * 2 * Math.PI;
      const x = Math.cos(alpha);
      const y = Math.sin(alpha);
      coords.push(x);
      coords.push(y);
    }
    const positions = new Float32Array(coords);
    const indices = earcut(positions);
    const uvs = [];
    for (let i = 0; i < positions.length; i += 2) {
      uvs.push((positions[i] + 1) * 0.5, (positions[i + 1] + 1) * 0.5);
    }
    return new MeshGeometry({
      positions,
      uvs: new Float32Array(uvs),
      indices: new Uint32Array(indices),
    });
  }
}
