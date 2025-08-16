import { useEffect } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import useSettingsStore from "../../data/store/SettingsStore";
import { usePencileStore } from "../../data/store/PencileStore";
import { CanvasCursor } from "../../features/service/Cursor";

function CursorEffect() {
    const zoom = useCanvasStore().zoome;
    const color = useSettingsStore((state) => state);
    const activeTool = useCanvasStore((state) => state.activeTool);
    const canvasCursorActive = useCanvasStore((state) => state.canvasCursorActive);
   const pen = usePencileStore();
    useEffect(() => {
       CanvasCursor.updateCursor();
    }, [color, activeTool, zoom, pen]);

    useEffect(() => {
       CanvasCursor.updateCursorVisibilty();
    }, [canvasCursorActive])


  return <></>;
}

export default CursorEffect;
