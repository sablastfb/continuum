import { Circle, HexagonIcon, Square } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import { useShapesStore } from "../../../data/store/ShapeStore";

const ShapeToolMenue = () => {
  const canvasStore = useToolStore();
  const shapesStore = useShapesStore();
  const toolType = "shape";
  const fillColor =
    shapesStore.fillType === "fill-only" ||
    shapesStore.fillType === "outline-and-fill"
      ? Continuum_Canvas.colorPalet.getColor(shapesStore.fillColorId)
      : "transparent";
  const strokeColor =
    shapesStore.fillType === "outline-only" ||
    shapesStore.fillType === "outline-and-fill"
      ? Continuum_Canvas.colorPalet.getColor(shapesStore.strokeColorId)
      : "transparent";
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
        {shapesStore.shape === "square" && (
          <Square
            strokeWidth={2}
            size={DefaultIconSize}
            fill={fillColor}
            stroke={strokeColor}
          />
        )}
        {shapesStore.shape === "circle" && (
          <Circle
            size={DefaultIconSize}
            fill={fillColor}
            stroke={strokeColor}
          />
        )}
        {shapesStore.shape === "poligon" && (
          <HexagonIcon
            size={DefaultIconSize}
            fill={fillColor}
            stroke={strokeColor}
          />
        )}
      </div>
    </>
  );
};

export default ShapeToolMenue;
