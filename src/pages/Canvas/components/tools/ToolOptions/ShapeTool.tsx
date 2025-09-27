import { Square } from "lucide-react";
import {
  ShapeFillType,
  ShapesStore,
  useShapesStore,
} from "../../../data/store/ShapeStore";
import ArrayDivider from "../../misc/ArrayDivider";
import CircleColorPicker from "../../pickers/CircleColorPicker";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";
import { BackgroundTypes } from "../../../features/service/TailBackground";

interface ShapeToolProps {
  shapeType: keyof ShapesStore["shapes"];
  fillType?: ShapeFillType;
  bacgroundType?: BackgroundTypes;
}

export function SahpeColorPicker({ shapeType }: ShapeToolProps) {
  const updateShape = useShapesStore((state) => state.updateShape);
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
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
    </>
  );
}

export function ShapeTypeBacground({
  shapeType,
  bacgroundType,
}: ShapeToolProps) {
  const updateShape = useShapesStore((state) => state.updateShape);

  return (
    <div
      onClick={() => {
        updateShape(shapeType, { activeBacgroundType: bacgroundType });
      }}
    >
      {bacgroundType}
    </div>
  );
}

export function ShapeToolFill({ shapeType, fillType }: ShapeToolProps) {
  const updateShape = useShapesStore((state) => state.updateShape);
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
  return (
    <div
      onClick={() => updateShape(shapeType, { fillType })}
      className={`rounded-full w-7 h-7 hover:cursor-pointer flex justify-center items-center ${
        shapeData.fillType === fillType ? defaultOutlineColor : ""
      }`}
    >
      {fillType === "outline-fill" && (
        <Square className="fill-gray-100  stroke-black stroke-4" />
      )}
      {fillType === "fill-only" && (
        <Square size={18} fill="white" className="fill-gray-100 " />
      )}
      {fillType === "outline-only" && (
        <Square fill="none" stroke="currentColor" strokeWidth={2} />
      )}
    </div>
  );
}

function ShapeTool({ shapeType }: ShapeToolProps) {
  const shapeData = useShapesStore((state) => state.shapes[shapeType]);
  const updateShape = useShapesStore((state) => state.updateShape);
  return (
    <>
      <div className="flex flex-col gap-3">
        <ShapeToolFill shapeType={shapeType} fillType="outline-fill" />
        <ShapeToolFill shapeType={shapeType} fillType="fill-only" />
        <ShapeToolFill shapeType={shapeType} fillType="outline-only" />
      </div>
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

      <ArrayDivider orjentation="horizontal" />
      <div>
        <ShapeTypeBacground
          shapeType={shapeType}
          bacgroundType="color"
        ></ShapeTypeBacground>
        <ShapeTypeBacground
          shapeType={shapeType}
          bacgroundType="dots"
        ></ShapeTypeBacground>
        <ShapeTypeBacground
          shapeType={shapeType}
          bacgroundType="grid"
        ></ShapeTypeBacground>
        <ShapeTypeBacground
          shapeType={shapeType}
          bacgroundType="line"
        ></ShapeTypeBacground>
      </div>

      <ArrayDivider orjentation="horizontal" />
      {shapeData.activeBacgroundType === "color" && (
        <>
          <SahpeColorPicker shapeType={shapeType} />
        </>
      )}
    </>
  );
}

export default ShapeTool;
