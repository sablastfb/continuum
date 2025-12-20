import useCanvasStore from "../../../data/store/CanvasStore.ts";
import {useEraseStore} from "../../../data/store/EraseStore.ts";
import {Continuum_Canvas} from "../../CanvasApp.ts";
import {ICursor} from "../CursorManager.ts";

export class CircleCursor implements ICursor {
    updateCursor(): void {
        const zoom = useCanvasStore.getState().zoom;

        const radius =
            zoom * Continuum_Canvas.thicknessPalette.getThickness(useEraseStore.getState().thicknessId);
        Continuum_Canvas.cursorManager.cursorGraphic.clear();
        Continuum_Canvas.cursorManager.cursorGraphic
            .circle(0, 0, radius)
            .fill({color: Continuum_Canvas.colorPalette.getColor("c-2"), alpha: 0.5})
            .stroke({width: 1, color: Continuum_Canvas.colorPalette.getColor("c-2")});
    }

}
