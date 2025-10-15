import { Circle, HexagonIcon, Square } from "lucide-react";
import { DefaultIconSize } from "../../data/constants/CanvasConstants";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";
import { useState } from "react";

function ShapeToolMenue() {
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
        <Square size={DefaultIconSize} />
        <Circle size={DefaultIconSize}/>
        <HexagonIcon size={DefaultIconSize}/>
      </div>
    </>
  );
}

export default ShapeToolMenue;
