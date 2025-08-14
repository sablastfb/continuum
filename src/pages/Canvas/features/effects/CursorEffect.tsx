import { useEffect } from "react";
import { Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import useSettingsStore from "../../data/store/SettingsStore";

function CursorEffect() {
    const zoom = useCanvasStore().zoome;
    const color = useSettingsStore((state) => state.pencile);
    const activeTool = useCanvasStore((state) => state.activeTool);
    const canvasCursorActive = useCanvasStore((state) => state.canvasCursorActive);

    useEffect(() => {
       Canvas.updateCursor();
    }, [color, activeTool, zoom]);

    useEffect(() => {
       Canvas.updateCursorVisibilty();
    }, [canvasCursorActive])


  return <></>;
}

export default CursorEffect;
