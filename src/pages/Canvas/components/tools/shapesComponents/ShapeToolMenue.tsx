import { Circle, HexagonIcon, Square } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/types/CanvasConstants";
import { useShapesStore } from "../../../data/store/ShapeStore";
import useToolStore from "../../../data/store/ToolStore";

function ShapeToolMenue() {
  const canvasStore = useToolStore();
  const shapesStore = useShapesStore();
  const toolType = "shape";
  return (
    <>
      <div
        className={`cursor-pointer
           ${canvasStore.activeTool === toolType && DefaultOutline}
          
          `}
        onClick={() => {
          canvasStore.setActiveTool(toolType);
        }}
      >
        {shapesStore.shape === 'square' && <Square size={DefaultIconSize} />}
        {shapesStore.shape === 'circle' && <Circle size={DefaultIconSize} />}
        {shapesStore.shape === 'poligon' && <HexagonIcon size={DefaultIconSize} />}
      </div>
    </>
  );
}

export default ShapeToolMenue;
