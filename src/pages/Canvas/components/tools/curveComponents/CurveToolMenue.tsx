import { Highlighter, Pencil } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultSelectionOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";

function CurveToolMenue() {
  const canvasStore = useToolStore();

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
