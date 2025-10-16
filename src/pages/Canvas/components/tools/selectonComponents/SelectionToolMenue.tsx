import {
  Camera,
  Lasso,
  MousePointer2,
  SquareDashed,
} from "lucide-react";

import { DefaultIconSize } from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";

function SelectionToolMenue() {
  const canvasStore = useToolStore();

  return (
    <>
      <div
        className="cursor-pointer"
      >
       {canvasStore.activeTool === "pan-zoom" && <MousePointer2 size={DefaultIconSize} />}
       {canvasStore.activeTool === "selection-lasso" && <Lasso size={DefaultIconSize} />}
       {canvasStore.activeTool === "selection-square" && <SquareDashed size={DefaultIconSize}/>}
       {canvasStore.activeTool === "screen-shot" && <Camera size={DefaultIconSize} />}
      </div>
    </>
  );
}

export default SelectionToolMenue;
