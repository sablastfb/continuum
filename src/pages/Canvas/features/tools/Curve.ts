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
import {GraphicsCommand} from "../commands/Graphics";
import {Continuum_Canvas} from "../CanvasApp";
import {CurveToolType, ToolType} from "../../data/types/ToolTypes";
import {useInputStore} from "../../data/store/InputStore.ts";
import {TexturedCurve} from "../service/CurveAlgorithms/TexturedCurve.ts";
import { SimplePoint } from "../../data/types/PointTypes.ts";
import { Continuum_Math } from "../service/MathUtils.ts";
import { Path } from "paper/dist/paper-core";

export class Curve implements ITool {
    type: ToolType = "base";
    private activeGraphics: Graphics|ParticleContainer| null = null;

    private activeColor: string | null = null;
    private activeThickness: number | null = null;
    private fillStyle: CurveFillType = 'solid';
    private lastPoint: SimplePoint = {x:0,y:0};

    private bluer = new BlurFilter({quality: 4, strength: 2});
    private filter = new AlphaFilter({alpha: 0.4});

    constructor(toolType: CurveToolType) {
        this.type = toolType;
    }

    public startDrawing() {
        if (!Continuum_Canvas.viewportManager.viewport) return;
        
        this.fillStyle = useCurveStore.getState().penSettings.fillStyle;
        this.activeGraphics = this.fillStyle === 'solid' ? new Graphics() : new ParticleContainer();
        Continuum_Canvas.viewportManager.viewport.addChild(this.activeGraphics);

        this.activeGraphics.interactiveChildren = false;
        this.activeGraphics.interactive = false;

        switch (this.type) {
            case "pen":
                this.activeColor = Continuum_Canvas.colorPalette.getColor(
                    useCurveStore.getState().penSettings.colorId
                );
                this.activeThickness = Continuum_Canvas.thicknessPalette.getThickness(
                    useCurveStore.getState().thicknessId
                );
                if (this.fillStyle === 'solid'){
                    this.activeGraphics.tint = this.activeColor;
                } 
                break;
            case "marker":
                this.activeColor = Continuum_Canvas.colorPalette.getColor(
                    useCurveStore.getState().markerSettings.colorId
                );
                this.activeThickness = Continuum_Canvas.thicknessPalette.getThickness(
                    useCurveStore.getState().thicknessId
                );
                this.activeGraphics.tint = this.activeColor;
                this.activeGraphics.filters = [this.filter, this.bluer];
                if (this.fillStyle === 'solid'){
                    this.activeGraphics.stroke({
                        width: this.activeThickness * 2,
                        join: "round",
                        color: "white",
                        cap: "round",
                    });
                }
                break;
        }

        const mousePosition = useInputStore.getState().mousePosition;
        this.lastPoint = {x: mousePosition.x, y: mousePosition.y};
        this.paperPath = new Path([new Point(mousePosition.x, mousePosition.y)]); 
    }

    public draw() {
        if (this.activeGraphics === null) return;
        if (this.activeThickness === null) return;
        if (this.activeColor === null) return;
        if (!Continuum_Canvas.viewportManager.viewport) return;
        if (!this.paperPath) return;
        const mousePosition = useInputStore.getState().mousePosition;
        if (Continuum_Math.Distance(mousePosition, this.lastPoint) < 5){
            return;
        }

        this.lastPoint = mousePosition;

        this.paperPath!.add(new Point(mousePosition.x, mousePosition.y));
        const segments = this.paperPath.segments;
        if (segments.length < 2) return;

        // Get the last segment
        const segment = segments[segments.length - 1];
        const prevSegment = segments[segments.length - 2];
        
        // Draw bezier curve from previous point to current point
        if (this.fillStyle === 'solid'){
            this.activeGraphics.bezierCurveTo(
                prevSegment.handleOut.x + prevSegment.point.x,
                prevSegment.handleOut.y + prevSegment.point.y,
                segment.handleIn.x + segment.point.x,
                segment.handleIn.y + segment.point.y,
                segment.point.x,
                segment.point.y
            );
        }


        //this.activeCurve.lineTo(mousePosition.x, mousePosition.y);
        switch (this.type) {
            case "pen":
                if (this.fillStyle === 'solid'){
                this.activeGraphics.stroke({
                    width: this.activeThickness * 2,
                    color: "white",
                    cap: "round",
                    join: "round",
                });
            }
                break;
            case "marker":
                // this.activeCurve.stroke({
                //     width: this.activeThickness * 2,
                //     join: "round",
                //     color: "white",
                //     cap: "round",
                // });

                break;
        }
    }

    public async endDrawing() {
        if (this.activeThickness === null) return;
        if (this.activeGraphics === null) return;
        if (!this.activeColor) return;
        if (!Continuum_Canvas.viewportManager.viewport) return;
        if (!this.paperPath) return;
        this.paperPath.simplify(1);

        switch (this.fillStyle) {
            case "solid": {
                this.activeGraphics = CreatGraphicPath(this.paperPath, this.activeGraphics);
                this.activeGraphics.stroke({
                    width: this.activeThickness * 2,
                    color: "white",
                    cap: "round",
                    join: "round",
                });
                break;
            }
            case  'dashed': {
                const dash = Continuum_Canvas.textureManager.get('dash-1');
                this.activeGraphics = await TexturedCurve.TexturedCurve(this.paperPath, dash!);
                break
            }
            case 'dotted': {
                const circle = Continuum_Canvas.textureManager.get('dot-1');
                this.activeGraphics = await TexturedCurve.TexturedCurve(this.paperPath, circle!);
            }
        }


        const g: GraphicsData = {
            id: uuidv4(),
            type: "curve",
            graph: this.activeGraphics,
            visible: true,
            graphicInfo: {
                path: this.paperPath,
                thickness: this.activeThickness * 2,
            },
        };

        graphicOnCanvas.set(g.id, g);
        GraphicsCommand.addNew(g);
        this.paperPath?.remove();
    }
}
