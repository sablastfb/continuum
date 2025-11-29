import { earcut, Mesh, MeshGeometry, Shader } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import vertex from "./Shader/shaders/shape/shape.vert?raw";
import gridShapeShader from "./Shader/shaders/shape/shape.frag?raw";
import { Path, Rectangle, Size } from "paper/dist/paper-core";
export class MeshCreator {
  setGeometry(mesh: Mesh<MeshGeometry, Shader>, width: number, height: number) {
  var rect = new Rectangle(0,0,width,height);
  var path = new Path.Rectangle(rect, new Size(5, 5));
  const coords: number[] = [];
    path.flatten(5); // Parameter is the maximum distance between points

    path.segments.forEach(segment => {
        coords.push(segment.point.x, segment.point.y);
    });
    mesh.geometry.positions = new Float32Array(coords);
    const uvs = [];
    const indices = earcut(mesh.geometry.positions);
    for (let i = 0; i < coords.length; i += 2) {
      uvs.push(coords[i] / width, coords[i + 1] / height);
    }
    mesh.geometry.indices = new Uint32Array(indices);
    mesh.geometry.uvs = new Float32Array(uvs);
  }

  public createMesh() {
    const shader = Shader.from({
      gl: {
        vertex: vertex,
        fragment: gridShapeShader,
      },
      resources: {
        uniforms: {
          iResolution: { value: [640, 360], type: "vec2<f32>" },
        },
      },
    });

    const geometry = new MeshGeometry({
      positions: new Float32Array([]),
      uvs: new Float32Array([]),
      indices: new Uint32Array([]),
    });
    return new Mesh({ geometry, shader: shader });
  }

  private rectangleGeometry(width: number, height: number) {
    const positions = new Float32Array([
      0,
      0,
      width,
      0,
      width,
      width,
      0,
      width,
    ]);
    return positions;
  }

  public updateShapeSize(w: number, h: number) {
    // const shader = this.shader;
    // if (shader && Continuum_Canvas.viewportManager.viewport) {
    //   const uniforms = shader.resources.uniforms.uniforms;
    //   uniforms.iResolution = [w,h];
    // }
  }

  private roundedRectangleGeometry(
    width: number = 2,
    height: number = 1,
    radius: number = 0.0,
    cornerSegments: number = 8
  ) {
    const coords: number[] = [];

    // Helper to add corner arc
    const addCorner = (cx: number, cy: number, startAngle: number) => {
      for (let i = 0; i <= cornerSegments; i++) {
        const angle = startAngle + (i / cornerSegments) * (Math.PI / 2);
        coords.push(
          cx + Math.cos(angle) * radius,
          cy + Math.sin(angle) * radius
        );
      }
    };

    // Top-right corner (starting from top, going right)
    addCorner(width - radius, radius, -Math.PI / 2);

    // Bottom-right corner (starting from right, going down)
    addCorner(width - radius, height - radius, 0);

    // Bottom-left corner (starting from bottom, going left)
    addCorner(radius, height - radius, Math.PI / 2);

    // Top-left corner (starting from left, going up)
    addCorner(radius, radius, Math.PI);

    const positions = new Float32Array(coords);
    const indices = earcut(positions);

    // Generate UVs normalized to 0-1
    const uvs: number[] = [];
    for (let i = 0; i < positions.length; i += 2) {
      uvs.push(positions[i] / width, positions[i + 1] / height);
    }

    return new MeshGeometry({
      positions,
      uvs: new Float32Array(uvs),
      indices: new Uint32Array(indices),
    });
  }

  //   if (!Continuum_Canvas.appInstance) return;
  //   Continuum_Canvas.appInstance.ticker.add(() => {
  //     this.shader.resources.shaderToyUniforms.uniforms.iTime +=
  //       Continuum_Canvas.appInstance!.ticker.elapsedMS / 1000;
  //   });

  //   const coords = [];
  //   for (let i = 0; i < n; i += 1) {
  //     const alpha = (i / n) * 2 * Math.PI;
  //     const x = Math.cos(alpha);
  //     const y = Math.sin(alpha);
  //     coords.push(x);
  //     coords.push(y);
  //   }
  //   const positions = new Float32Array(coords);
  //   const indices = earcut(positions);
  //   const uvs = [];
  //   for (let i = 0; i < positions.length; i += 2) {
  //     uvs.push((positions[i] + 1) * 0.5, (positions[i + 1] + 1) * 0.5);
  //   }
  //   return new MeshGeometry({
  //     positions,
  //     uvs: new Float32Array(uvs),
  //     indices: new Uint32Array(indices),
  //   });
  // }
}
