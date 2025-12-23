import {
    AlphaFilter,
    BlurFilter,
    Graphics, ParticleContainer,
    Point,
} from "pixi.js";
import {CurveFillType, useCurveStore} from "../../data/store/PenStore";
import {ITool} from "./ToolManager";
import {GraphicsData, graphicOnCanvas} from "../data/GraphicsDataManager";
import {v4 as uuidv4} from "uuid";
import {Continuum_CurveService} from "../service/CurveService";
import {GraphicsCommand} from "../commands/Graphics";
import {Continuum_Canvas} from "../CanvasApp";
import {CurveToolType, ToolType} from "../../data/types/ToolTypes";
import {useInputStore} from "../../data/store/InputStore.ts";
import {CurveGenerator} from "../service/CurveGenerator.ts";
import CreatGraphicPath = Continuum_CurveService.CreatGraphicPath;

export class Curve implements ITool {
    type: ToolType = "base";
    private activeCurve: Graphics | null = null;
    private activeColor: string | null = null;
    private activeThickness: number | null = null;
    private line: Point[] = [];
    private filter = new AlphaFilter({alpha: 0.4});
    private bluer = new BlurFilter({quality: 4, strength: 2});
    private fillStyle: CurveFillType = 'solid';

    constructor(toolType: CurveToolType) {
        this.type = toolType;
    }

    public startDrawing() {
        if (!Continuum_Canvas.viewportManager.viewport) return;
        this.fillStyle = useCurveStore.getState().penSettings.fillStyle;

        this.activeCurve = new Graphics();
        Continuum_Canvas.viewportManager.viewport.addChild(this.activeCurve);

        switch (this.type) {
            case "pen":
                this.activeColor = Continuum_Canvas.colorPalette.getColor(
                    useCurveStore.getState().penSettings.colorId
                );
                this.activeThickness = Continuum_Canvas.thicknessPalette.getThickness(
                    useCurveStore.getState().thicknessId
                );
                break;
            case "marker":
                this.activeColor = Continuum_Canvas.colorPalette.getColor(
                    useCurveStore.getState().markerSettings.colorId
                );
                this.activeThickness = Continuum_Canvas.thicknessPalette.getThickness(
                    useCurveStore.getState().thicknessId
                );
                this.activeCurve.filters = [this.filter, this.bluer];

                break;
        }

        const mousePosition = useInputStore.getState().mousePosition;

        this.line.push(new Point(mousePosition.x, mousePosition.y));
        this.activeCurve.moveTo(mousePosition.x, mousePosition.y);
    }

    public draw() {
        if (this.activeCurve === null) return;
        if (this.activeThickness === null) return;
        if (this.activeColor === null) return;
        if (!Continuum_Canvas.viewportManager.viewport) return;
        const mousePosition = useInputStore.getState().mousePosition;

        this.line.push(new Point(mousePosition.x, mousePosition.y));
        this.activeCurve.lineTo(mousePosition.x, mousePosition.y);
        switch (this.type) {
            case "pen":
                this.activeCurve.stroke({
                    width: this.activeThickness * 2,
                    color: "white",
                    cap: "round",
                    join: "round",
                });
                this.activeCurve.tint = this.activeColor;
                break;
            case "marker":
                this.activeCurve.stroke({
                    width: this.activeThickness * 2,
                    join: "round",
                    color: "white",
                    cap: "round",
                });
                this.activeCurve.tint = this.activeColor;

                break;
        }
    }

    public async endDrawing() {
        if (this.activeThickness === null) return;
        if (this.activeCurve === null) return;
        if (!this.activeColor) return;
        if (!Continuum_Canvas.viewportManager.viewport) return;
        const optimizedPath = Continuum_CurveService.ConverseLineToPath(this.line, useCurveStore.getState().simplificationTolerance);
        let optimizedCurveGraphics: ParticleContainer | Graphics;
        switch (this.fillStyle) {
            case "solid": {
                optimizedCurveGraphics = CreatGraphicPath(optimizedPath);
                optimizedCurveGraphics.stroke({
                    width: this.activeThickness * 2,
                    color: "white",
                    cap: "round",
                    join: "round",
                });
                break;
            }
            case  'dashed': {
                const circle = Continuum_Canvas.textureManager.get('dash-1');
                optimizedCurveGraphics = await CurveGenerator.TexturedCurve(optimizedPath, circle!);
                break
            }
            case 'dotted': {
                const circle = Continuum_Canvas.textureManager.get('dot-1');
                optimizedCurveGraphics = await CurveGenerator.TexturedCurve(optimizedPath, circle!);
            }
        }


        // const circle = Continuum_Canvas.textureManager.get('dash-1');
        // const optimizedCurveGraphics= await CurveGenerator.TexturedCurve(optimizedPath, circle!);

        const g: GraphicsData = {
            id: uuidv4(),
            type: "curve",
            graph: optimizedCurveGraphics,
            visible: true,
            graphicInfo: {
                path: optimizedPath,
                thickness: this.activeThickness * 2,
            },
        };
        graphicOnCanvas.set(g.id, g);
        GraphicsCommand.addNew(g);


        Continuum_Canvas.viewportManager.viewport?.removeChild(this.activeCurve);
        Continuum_Canvas.viewportManager.viewport?.addChild(optimizedCurveGraphics);

        switch (this.type) {
            case "pen":
                // if (this.line.length == 2) {
                //     const firstCurve = optimizedPath.curves[0];
                //     const firstPoint = firstCurve.point1;
                //     if (firstPoint) {
                //         optimizedCurveGraphics
                //             .circle(firstPoint.x, firstPoint.y, this.activeThickness)
                //             .fill("white");
                //     }
                // }


                optimizedCurveGraphics.tint = this.activeColor;
                break;
            case "marker":
                // if (this.line.length == 2) {
                //     const firstCurve = optimizedPath.curves[0];
                //     const firstPoint = firstCurve.point1;
                //     if (firstPoint) {
                //         optimizedCurveGraphics
                //             .circle(firstPoint.x, firstPoint.y, this.activeThickness)
                //             .fill("white");
                //     }
                // }
                // optimizedCurveGraphics.stroke({
                //     width: this.activeThickness * 2,
                //     join: "round",
                //     color: "white",
                //     cap: "round",
                // });

                optimizedCurveGraphics.tint = this.activeColor;
                optimizedCurveGraphics.filters = [this.filter, this.bluer];

                break;
        }

        this.line = [];
    }
}
