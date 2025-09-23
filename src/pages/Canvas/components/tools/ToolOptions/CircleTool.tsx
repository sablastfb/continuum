import { ShapesStore, useShapesStore } from "../../../data/store/ShapeStore";

interface ShapeToolProps {
  shapeType: keyof ShapesStore["shapes"];
}

function ShapeTool({ shapeType }: ShapeToolProps) {
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
  const updateShape = useShapesStore((state) => state.updateShape);
  return <>{shapeData.color}</>;
}

export default ShapeTool;
