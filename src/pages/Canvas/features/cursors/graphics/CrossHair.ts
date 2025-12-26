import useCanvasStore from "../../../data/store/CanvasStore.ts";
import {CurveFillType, useCurveStore} from "../../../data/store/PenStore.ts";
import {Continuum_Canvas} from "../../CanvasApp.ts";
import {ICursor} from "../CursorManager.ts";
import {useKeyStore} from "../../../data/store/KeyStore.ts";
import {Path, Point} from "paper/dist/paper-core";
import {TexturedCurve} from "../../curve/TexturedCurve.ts";
import {ParticleContainer} from "pixi.js";

export class CrossHairCursor implements ICursor {
    private particleContainer: ParticleContainer | null = null;
    private async getStroke(fillType: CurveFillType, radius: number) {
        switch (fillType) {
            case 'solid':
                Continuum_Canvas.cursorManager.cursorGraphic.circle(0, 0, radius)
                    .stroke({
                        alignment: 0,
                        width: 2,
                        color: Continuum_Canvas.colorPalette.getColor("c-1"),
                    });
                break;
            case "dotted": {
                const center = new Point(0, 0);
                const texture = Continuum_Canvas.textureManager.get('dot-1' );
                const circlePath = new Path.Circle({center, radius: [radius, radius]});
                this.particleContainer = await TexturedCurve.TexturedCurve(circlePath,texture!, this.particleContainer,2);
                Continuum_Canvas.cursorManager.cursorGraphic.addChild(this.particleContainer);
                break;
            }
            case "dashed":{
                const center = new Point(0, 0);
                const circlePath = new Path.Circle({center, radius: [radius, radius]});
                const texture = Continuum_Canvas.textureManager.get('dash-1' );
                this.particleContainer = await TexturedCurve.TexturedCurve(circlePath,texture!, this.particleContainer,2);
                Continuum_Canvas.cursorManager.cursorGraphic.addChild(this.particleContainer);
                break;
            }
        }
    }

    updateCursor() {
        if (!Continuum_Canvas.cursorManager.cursorGraphic) return;

        Continuum_Canvas.cursorManager.cursorGraphic.clear();
        Continuum_Canvas.cursorManager.cursorGraphic.removeChildren();
        const lineWidth = 1;
        const outlineWidth = 1;
        const color = Continuum_Canvas.colorPalette.getColor(
            useCurveStore.getState().penSettings.colorId
        );
        const zoom = useCanvasStore.getState().zoom;
        const radius =
            zoom * Continuum_Canvas.thicknessPalette.getThickness(useCurveStore.getState().thicknessId);
        const outerRadius = Math.max(radius + 5, 10);

        const alpha = useKeyStore.getState().pointerDown ? 0 : 0.5;

        const lineDistance = 19 + outerRadius;
        Continuum_Canvas.cursorManager.cursorGraphic
            .circle(0, 0, outerRadius).fill({color: "white", alpha})
            .circle(0, 0, radius)
            .fill(color);

        this.getStroke(useCurveStore.getState().penSettings.fillStyle, outerRadius);
    }
}
