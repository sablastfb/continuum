import { useEffect } from "react";
import { Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";
import useSettingsStore from "../../data/store/SettingsStore";
import { usePencileStore } from "../../data/store/PencileStore";

function CursorEffect() {
    const zoom = useCanvasStore().zoome;
    const color = useSettingsStore((state) => state.pencile);
    const activeTool = useCanvasStore((state) => state.activeTool);
    const canvasCursorActive = useCanvasStore((state) => state.canvasCursorActive);
   const pen = usePencileStore();
    useEffect(() => {
       Canvas.updateCursor();
    }, [color, activeTool, zoom, pen]);

    useEffect(() => {
       Canvas.updateCursorVisibilty();
    }, [canvasCursorActive])


  return <></>;
}

export default CursorEffect;
