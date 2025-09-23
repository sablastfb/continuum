import { Square, SquareDashed } from "lucide-react";
import { ShapesStore, useShapesStore } from "../../../data/store/ShapeStore";
import ArrayDivider from "../../misc/ArrayDivider";
import CircleColorPicker from "../../pickers/CircleColorPicker";
import {
  defaultIconSize,
  defaultOutlineColor,
} from "../../../data/constants/CanvasConstants";

interface ShapeToolProps {
  shapeType: keyof ShapesStore["shapes"];
}

function ShapeTool({ shapeType }: ShapeToolProps) {
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
  const updateShape = useShapesStore((state) => state.updateShape);
  return (
    <>
      <div className="flex flex-col gap-3">
        <div
          onClick={() => updateShape(shapeType, { fillType: "outline-fill" })}
          className={`rounded-full w-7 h-7 hover:cursor-pointer ${
            shapeData.fillType === "fill-only" ? defaultOutlineColor : ""
          }`}
        >
          <Square fill="white" size={defaultIconSize} />
        </div>
        <div
          onClick={() => updateShape(shapeType, { fillType: "fill-only" })}
          className={`rounded-full w-7 h-7 hover:cursor-pointer ${
            shapeData.fillType === "fill-only" ? defaultOutlineColor : ""
          }`}
        >
          <Square size={defaultIconSize} />
        </div>
        <div
          onClick={() => updateShape(shapeType, { fillType: "outline-only" })}
          className={`rounded-full w-7 h-7 hover:cursor-pointer ${
            shapeData.fillType === "fill-only" ? defaultOutlineColor : ""
          }`}
        >
          <SquareDashed size={defaultIconSize} />
        </div>
      </div>

      <ArrayDivider orjentation="horizontal" />
      {shapeData.backgroundColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === shapeData.color}
            action={() => updateShape(shapeType, { color: colorId })}
          />
        );
      })}
      <ArrayDivider orjentation="horizontal" />
      {shapeData.outlineColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === shapeData.outlineColor}
            action={() => updateShape(shapeType, { outlineColor: colorId })}
          />
        );
      })}
    </>
  );
}

export default ShapeTool;
