import { Highlighter, Pencil } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutlineColor as DefaultSelectionOutline,
} from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";

function CurveToolMenue() {
  const canvasStore = useCanvasStore();

  return (
    <>
      <div
        className={`cursor-pointer   ${
          ["pen", "highlighter"].includes(canvasStore.activeTool) &&
          DefaultSelectionOutline
        }`}
        onClick={() => {
          canvasStore.setActiveTool(canvasStore.activeTool);
        }}
      >
        {canvasStore.activeTool === "pen" && 
        <Pencil size={DefaultIconSize} />}
        {canvasStore.activeTool === "highlighter" && (
          <Highlighter size={DefaultIconSize} />
        )}
      </div>
    </>
  );
}

export default CurveToolMenue;
