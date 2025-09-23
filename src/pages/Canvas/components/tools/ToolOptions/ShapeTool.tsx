import { ShapesStore, useShapesStore } from "../../../data/store/ShapeStore";
import ArrayDivider from "../../misc/ArrayDivider";
import CircleColorPicker from "../../pickers/CircleColorPicker";

interface ShapeToolProps {
  shapeType: keyof ShapesStore["shapes"];
}

function ShapeTool({ shapeType }: ShapeToolProps) {
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
  const updateShape = useShapesStore((state) => state.updateShape);
  return (
    <>
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
