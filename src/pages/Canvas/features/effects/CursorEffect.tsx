import { useEffect } from "react";
import { Canvas } from "../CanvasApp";
import useCanvasStore from "../../data/store/CanvasStore";

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
