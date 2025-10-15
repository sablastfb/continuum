import {
  Camera,
  Lasso,
  MousePointer2,
  SquareDashed,
} from "lucide-react";

import { useState } from "react";
import useCanvasStore from "../../data/store/CanvasStore";
import { Continuum_ToolManager } from "../../features/tools/ToolManager";
import { DefaultIconSize } from "../../data/constants/CanvasConstants";

function SelectionToolMenue() {
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
        <div>
          <Lasso size={DefaultIconSize} />
        </div>
        <div>
          <Camera size={DefaultIconSize} />
        </div>
        <MousePointer2 />
        <SquareDashed />
      </div>
    </>
  );
}

export default SelectionToolMenue;
