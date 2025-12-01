import { earcut, Mesh, MeshGeometry, Shader } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { Path, Rectangle, Size } from "paper/dist/paper-core";
export type ContinuumMeshGeometry = {
  positions: Float32Array;
  indices: Uint32Array;
  uvs: Float32Array;
};

export class MeshManager {
  getRectangleGeometry(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    var rect = new Rectangle(x, y, width, height);
    var path = new Path.Rectangle(rect, new Size(radius, radius));
    const coords: number[] = [];
    path.flatten(1);

    path.segments.forEach((segment) => {
      coords.push(segment.point.x, segment.point.y);
    });
    const uvs = [];
    const indices = earcut(coords);
    for (let i = 0; i < coords.length; i += 2) {
      uvs.push(coords[i] / width, coords[i + 1] / height);
    }

    return {
      positions: new Float32Array(coords),
      indices: new Uint32Array(indices),
      uvs: new Float32Array(uvs),
    } as ContinuumMeshGeometry;
  }

  setGeometry(mesh: Mesh<MeshGeometry, Shader>, geometry: ContinuumMeshGeometry) {
    mesh.geometry.positions = geometry.positions;
    mesh.geometry.indices = geometry.indices;
    mesh.geometry.uvs = geometry.uvs;
  }

  public createMesh(shader:Shader) {
    const geometry = new MeshGeometry({
      positions: new Float32Array([]),
      uvs: new Float32Array([]),
      indices: new Uint32Array([]),
    });
    return new Mesh({ geometry, shader: shader });
  }


  public updateShapeResolution(mesh: Mesh<MeshGeometry, Shader>, w: number, h: number) {
    const shader = mesh.shader;
    if (shader && Continuum_Canvas.viewportManager.viewport) {
      const uniforms = shader.resources.uniforms.uniforms;
      uniforms.iResolution = [w,h];
    }
  }

}
