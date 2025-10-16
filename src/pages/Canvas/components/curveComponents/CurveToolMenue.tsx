import { Highlighter, Pencil } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutlineColor,
} from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";

function CurveToolMenue() {
  const canvasStore = useCanvasStore();

  return (
    <>
      <div
        className={`cursor-pointer   ${
          canvasStore.activeTool === "pen" && DefaultOutlineColor
        }`}
        onClick={() => {
          canvasStore.setActiveTool(canvasStore.activeTool)
        }}
      >
       {canvasStore.activeTool === 'pen' && <Pencil size={DefaultIconSize} />}
       {canvasStore.activeTool === 'highlighter' && <Highlighter size={DefaultIconSize} />}
      </div>
    </>
  );
}

export default CurveToolMenue;
