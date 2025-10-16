import { Camera, Lasso, MousePointer2, SquareDashed } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";

function SelectionToolMenue() {
  const canvasStore = useToolStore();

  return (
    <>
      <div
        className={`cursor-pointer
           ${
             canvasStore.activeTool === canvasStore.lastSelectionTool &&
             DefaultOutline
           }
          
          `}
        onClick={() => {
          canvasStore.setActiveTool(canvasStore.lastSelectionTool);
        }}
      >
        {canvasStore.lastSelectionTool === "pan-zoom" && (
          <MousePointer2 size={DefaultIconSize} />
        )}
        {canvasStore.lastSelectionTool === "selection-lasso" && (
          <Lasso size={DefaultIconSize} />
        )}
        {canvasStore.lastSelectionTool === "selection-square" && (
          <SquareDashed size={DefaultIconSize} />
        )}
        {canvasStore.lastSelectionTool === "screen-shot" && (
          <Camera size={DefaultIconSize} />
        )}
      </div>
    </>
  );
}

export default SelectionToolMenue;
