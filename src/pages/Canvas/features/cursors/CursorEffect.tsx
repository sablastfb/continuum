import {JSX, useEffect} from "react";
import useCanvasStore from "../../data/store/CanvasStore.ts";
import useBackgroundStore from "../../data/store/BackgroundStore.ts";
import {useCurveStore} from "../../data/store/PenStore.ts";
import {useEraseStore} from "../../data/store/EraseStore.ts";
import {Continuum_Canvas} from "../CanvasApp.ts";
import toolStore from "../../data/store/ToolStore.ts";
import {ToolType} from "../../data/types/ToolTypes.ts";
import {useKeyStore} from "../../data/store/KeyStore.ts";


const PenEffect = () => {
    const zoom = useCanvasStore((state) => state.zoom);
    const color = useBackgroundStore((state) => state);
    const pen = useCurveStore();
    const fillStyle = useCurveStore().penSettings.fillStyle;
    const eraser = useEraseStore();
    const pointerDown = useKeyStore().pointerDown;

    useEffect(() => {
        Continuum_Canvas.cursorManager.updateCursorGraphics();
    }, [color, zoom, pen, eraser, pointerDown, fillStyle]);

    return <></>;
}

const MarkerEffect = () => {
    const color = useBackgroundStore((state) => state);
    const pen = useCurveStore();
    const eraser = useEraseStore();


    useEffect(() => {
        Continuum_Canvas.cursorManager.updateCursorGraphics();
    }, [color, pen, eraser]);

    return <></>;
}


const CursorEffect = () => {
    const activeTool = toolStore().activeTool;
    const canvasCursorActive = useCanvasStore(
        (state) => state.canvasCursorActive
    );

    const cursorComponents: Record<ToolType,(() => JSX.Element)| null > = {
        pen: PenEffect,
        marker: MarkerEffect,
        base: null,
        "pan-zoom": null,
        "selection-lasso": null,
        "selection-square": null,
        "screen-shot": null,
        shape: null,
        eraser: null,
        text: null
    };

    const CurrentEffect: () => JSX.Element = cursorComponents[activeTool] ?? PenEffect;

    useEffect(() => {
        Continuum_Canvas.cursorManager.updateCursorVisibility(canvasCursorActive);
    }, [canvasCursorActive]);

    useEffect(() => {
        Continuum_Canvas.cursorManager.setCursor(activeTool);
    }, [activeTool]);

    return CurrentEffect ? <CurrentEffect/> : null;
}

export default CursorEffect;
