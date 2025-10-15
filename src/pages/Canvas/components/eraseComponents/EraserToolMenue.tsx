import {
  Camera,
  Eraser,
  Lasso,
  MousePointer2,
  Pen,
  Square,
  SquareDashed,
} from "lucide-react";
import { useState } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";
import { DefaultIconSize } from "../../data/constants/CanvasConstants";

function EraserToolMenue() {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const [activeCurveTool, setActiveCurveTool] =
    useState<Continuum_ToolManager.ToolType>("pen");
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => {
          setActiveCurveTool(activeCurveTool);
        }}
      >
          <Eraser size={DefaultIconSize} />
      </div>
    </>
  );
}

export default EraserToolMenue;
