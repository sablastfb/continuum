import { useEffect } from "react";
import { Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";

function CursorEffect() {
    const zoom = useCanvasStore().zoome;
    const color = useCanvasStore((state) => state.pencil);
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
