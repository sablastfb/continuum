import { useEffect } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { Canvas } from "../CanvasApp";

// empty component for redrowing cursor
function Cursor() {
    const color = useCanvasStore((state) => state.color);
    const activeTool = useCanvasStore((state) => state.activeTool);
    const canvasCursorActive = useCanvasStore((state) => state.canvasCursorActive);

    useEffect(() => {
       Canvas.updateCursor();
    }, [color, activeTool]);

    useEffect(() => {
       Canvas.updateCursorVisibilty();
    }, [canvasCursorActive])


  return <></>;
}

export default Cursor;
