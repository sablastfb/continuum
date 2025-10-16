import { Highlighter, Pencil } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";

function CurveToolMenue() {
  const canvasStore = useToolStore();

  return (
    <>
      <div
        className={`cursor-pointer   ${
          canvasStore.activeTool === canvasStore.lastCureveTool &&
          DefaultOutline
        }`}
        onClick={() => {
          canvasStore.setActiveTool(canvasStore.lastCureveTool);
        }}
      >
        {canvasStore.lastCureveTool === "pen" && <Pencil size={DefaultIconSize} />}
        {canvasStore.lastCureveTool === "highlighter" && (
          <Highlighter size={DefaultIconSize} />
        )}
      </div>
    </>
  );
}

export default CurveToolMenue;
