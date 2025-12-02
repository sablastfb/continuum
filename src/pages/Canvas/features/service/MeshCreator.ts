import { earcut, Mesh, MeshGeometry, Shader } from "pixi.js";
import { Continuum_Canvas } from "../CanvasApp";
import { Path, Point, Rectangle, Size } from "paper/dist/paper-core";
export type ContinuumMeshGeometry = {
  positions: Float32Array;
  indices: Uint32Array;
  uvs: Float32Array;
};

export class MeshManager {
  getRectangleGeometry(
    width: number,
    height: number,
    radius: number
  ) {
    var rect = new Rectangle(0, 0, width, height);
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

   getPoligonGeometry(
    radius: number,
    sides: number
  ) {
    var center = new Point(50, 50);

    var triangle = new Path.RegularPolygon(center, sides, radius);

    const coords: number[] = [];
    triangle.flatten(1);

    triangle.segments.forEach((segment) => {
      coords.push(segment.point.x, segment.point.y);
    });
    const uvs = [];
    const indices = earcut(coords);
    for (let i = 0; i < coords.length; i += 2) {
      uvs.push(coords[i] / radius, coords[i + 1] / radius);
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
