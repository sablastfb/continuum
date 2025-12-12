import { Container, Graphics, Point, RenderTexture, Sprite, MeshRope, Texture, Assets } from "pixi.js";
import { useCurveStore } from "../../data/store/PenStore";
import { ITool } from "./ToolManager";
import { GraphicsData, graphicOnCanvas } from "../data/GraphicsDataManager";
import { v4 as uuidv4 } from "uuid";
import { Continuum_CurveService } from "../service/CurveService";
import { GraphicsCommand } from "../commands/Graphics";
import { Continuum_Canvas } from "../CanvasApp";
import { ToolType } from "../../data/types/ToolTypes";
import { InputState } from "../input/InputState";
import { CrossHairCursor } from "../../ui/cursors/CrossHair";


export type CruveStyle = "pen" | "marker";

export class Curve implements ITool {
  type: ToolType = "base";
  private activeCurve: Graphics | null = null;
  private activeColor: string | null = null;
  private activeThicknes: number | null = null;
  private opacity: number | null = null;
  private points: Point[] = [];
  private curveContainer: Container | null = null;
  private meshRope: MeshRope | null = null;
  private ropeTexture: Texture | null = null;

  constructor(private curveStyleType: CruveStyle) {
    switch (curveStyleType) {
      case "pen":
        this.type = "pen";
        break;
      case "marker":
        this.type = "marker";
        break;
    }
  }

  public async startDrawing(e: InputState) {
    if (!Continuum_Canvas.viewportManager.viewport) return;

    switch (this.curveStyleType) {
      case "pen":
        this.activeColor = Continuum_Canvas.colorPalet.getColor(
          useCurveStore.getState().penSettings.colorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useCurveStore.getState().penSettings.thicknesId
        );
        this.opacity = 1;
        break;
      case "marker":
        this.activeColor = Continuum_Canvas.colorPalet.getColor(
          useCurveStore.getState().markerSettings.colorId
        );
        this.activeThicknes = Continuum_Canvas.thicknesPalet.getThicknes(
          useCurveStore.getState().markerSettings.thicknesId
        );
        this.opacity = useCurveStore.getState().markerSettings.opacity;
        break;
    }

    this.points = [new Point(e.mousePosition.x, e.mousePosition.y)];

    // Create texture
    const brushWidth = 32;
    const brushHeight = this.activeThicknes! * 4;
       this.ropeTexture = await Assets.load('https://pixijs.com/assets/snake.png');

    if (  this.ropeTexture){

      // Create MeshRope with initial point
      this.meshRope = new MeshRope({ 
        points: this.points, 
        texture: this.ropeTexture,
        textureScale: 1
      });
      
      Continuum_Canvas.viewportManager.viewport.addChild(this.meshRope);
    }
  }

  public draw(e: InputState) {
    if (this.meshRope === null) return;
    if (this.activeThicknes === null) return;
    if (this.activeColor === null) return;
    if (!Continuum_Canvas.viewportManager.viewport) return;

    // Add new point
    this.points.push(new Point(e.mousePosition.x, e.mousePosition.y));

    // Update the rope geometry with new points
    // Access the geometry's points buffer and update it
    const geometry = this.meshRope.geometry;
    const verticesBuffer = geometry.getBuffer('aPosition');
    
    // Rebuild points - MeshRope needs to be recreated with new points
    const newMeshRope = new MeshRope({ 
      points: this.points, 
      texture: this.ropeTexture! ,
       textureScale: 1
    });
    
    // Replace old mesh with new one
    Continuum_Canvas.viewportManager.viewport.removeChild(this.meshRope);
    this.meshRope.destroy({ children: false, texture: false, textureSource: false });
    this.meshRope = newMeshRope;
    Continuum_Canvas.viewportManager.viewport.addChild(this.meshRope);
  }

  public endDrawing() {
    if (this.activeThicknes === null) return;
    if (!this.activeColor) return;
    if (this.meshRope === null) return;
    if (!Continuum_Canvas.viewportManager.viewport) return;

    const optimizedPath = Continuum_CurveService.ConverLineToPath(this.points);
    const optimizedCruveGraphics =
      Continuum_CurveService.CreatGrahicPath(optimizedPath);
    const g: GraphicsData = {
      id: uuidv4(),
      type: "cruve",
      graph: optimizedCruveGraphics,
      visible: true,
      graphicInfo: {
        path: optimizedPath,
        thicknes: this.activeThicknes * 2,
      },
    };
    graphicOnCanvas.set(g.id, g);
    GraphicsCommand.addNew(g);

    Continuum_Canvas.viewportManager.viewport?.removeChild(this.meshRope);
    Continuum_Canvas.viewportManager.viewport?.addChild(optimizedCruveGraphics);

    switch (this.curveStyleType) {
      case "pen":
        if (this.points.length == 2) {
          const firstCurve = optimizedPath.curves[0];
          const firstPoint = firstCurve.point1;
          if (firstPoint) {
            optimizedCruveGraphics
              .circle(firstPoint.x, firstPoint.y, this.activeThicknes)
              .fill("white");
          }
        }
        optimizedCruveGraphics.stroke({
          width: this.activeThicknes * 2,
          color: "white",
          cap: "round",
          join: "round",
        });
        optimizedCruveGraphics.tint = this.activeColor;
        break;
      case "marker":
        if (this.points.length == 2) {
          const firstCurve = optimizedPath.curves[0];
          const firstPoint = firstCurve.point1;
          if (firstPoint) {
            optimizedCruveGraphics
              .circle(firstPoint.x, firstPoint.y, this.activeThicknes)
              .fill("white");
          }
        }
        optimizedCruveGraphics.stroke({
          width: this.activeThicknes * 2,
          join: "round",
        });
        optimizedCruveGraphics.tint = this.activeColor;
        optimizedCruveGraphics.alpha = this.opacity ?? 1;
        break;
    }

    // Clean up
    this.meshRope?.destroy({ texture: false, textureSource: false });
    this.ropeTexture?.destroy(true);
    this.meshRope = null;
    this.ropeTexture = null;
    this.points = [];
  }

  public updateCursor() {
    switch (this.type) {
      case "pen":
        CrossHairCursor.draw();
        break;
      case "marker":
        CrossHairCursor.draw();
    }
  }
}