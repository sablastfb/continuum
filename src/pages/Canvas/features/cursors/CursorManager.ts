import {Graphics} from "pixi.js";
import {ToolType} from "../../data/types/ToolTypes.ts";
import {CrossHairCursor} from "./graphics/CrossHair.ts";
import {SimpleCross} from "./graphics/SimpleCross.ts";
import {SimplePoint} from "../../data/types/PointTypes.ts";

export type ICursor = {
    updateCursor(): void;
}

export class CursorManager {
    public cursorGraphic: Graphics;
    public currentCursor: ICursor | null = null;

    private _crossHairCursor = new CrossHairCursor();
    private _simpleCross = new SimpleCross();

    public cursorGraphics: Record<ToolType, ICursor | null> = {
        pen: this._crossHairCursor,
        marker: this._crossHairCursor,
        shape: this._simpleCross,
        base: null,
        "pan-zoom": null,
        "selection-lasso": null,
        "selection-square": null,
        "screen-shot": null,
        eraser: null,
        text: null
    };

    constructor() {
        this.cursorGraphic = new Graphics();
        this.cursorGraphic.interactiveChildren = false;
        this.cursorGraphic.interactive = false;
    }

    public setCursor(activeTool: ToolType) {
        this.currentCursor = this.cursorGraphics[activeTool];
    }

    public updateCursorGraphics() {
        if (this.currentCursor){
            this.currentCursor.updateCursor();
        }
    }

    public updateCursorVisibility(visible: boolean) {
        if (this.cursorGraphic) {
            this.cursorGraphic.visible = visible;
        }
    }

    public updateCursorPosition(e: SimplePoint) {
        this.cursorGraphic.position.set(e.x, e.y);
    }
}
