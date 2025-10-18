import { Circle, HexagonIcon, Square } from "lucide-react";
import { ShapeFillType, useShapesStore } from "../../../data/store/ShapeStore";
import { BackgroundTypes } from "../../../features/service/TailBackground";
import CircleColorPicker from "../../pickers/CircleColorPicker";
import {
  DefaultIconSize,
  DefaultOutlineColor,
} from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";

// interface ShapeToolProps {
//   fillType?: ShapeFillType;
//   bacgroundType?: BackgroundTypes;
// }

// export function SahpeColorPicker({ shapeType }: ShapeToolProps) {
//   const updateShape = useShapesStore((state) => state.updateShape);
//   const shapeData = useShapesStore((state) => state.shapes[shapeType]);
//   return (
//     <>
//       {shapeData.backgroundColors.map((colorId, ix) => {
//         return (
//           <CircleColorPicker
//             colorId={colorId}
//             key={ix}
//             selected={colorId === shapeData.color}
//             action={() => updateShape(shapeType, { color: colorId })}
//           />
//         );
//       })}
//     </>
//   );
// }

// export function ShapeTypeBacground({
//   shapeType,
//   bacgroundType,
// }: ShapeToolProps) {
//   const updateShape = useShapesStore((state) => state.updateShape);

//   return (
//     <div
//       onClick={() => {
//         updateShape(shapeType, { activeBacgroundType: bacgroundType });
//       }}
//     >
//       {bacgroundType}
//     </div>
//   );
// }

// export function ShapeToolFill({ shapeType, fillType }: ShapeToolProps) {
//   const updateShape = useShapesStore((state) => state.updateShape);
//   const shapeData = useShapesStore((state) => state.shapes[shapeType]);
//   return (
//     <div
//       onClick={() => updateShape(shapeType, { fillType })}
//       className={`rounded-full w-7 h-7 hover:cursor-pointer flex justify-center items-center ${
//         shapeData.fillType === fillType ? DefaultOutlineColor : ""
//       }`}
//     >
//       {fillType === "outline-fill" && (
//         <Square className="fill-gray-100  stroke-black stroke-2" />
//       )}
//       {fillType === "fill-only" && (
//         <Square fill="white" className="fill-gray-100 stroke-0 " />
//       )}
//       {fillType === "outline-only" && (
//         <Square fill="none" stroke="currentColor" strokeWidth={2} />
//       )}
//     </div>
//   );
// }

function ShapeToolOptions() {
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  return (
    <>
      <ToolOptionHeaderComponent />
      {/* shapes */}
      <Square size={DefaultIconSize} />
      <Circle size={DefaultIconSize} />
      <HexagonIcon size={DefaultIconSize} />
      <ArrayDivider direction={toolOptionsDirection} />
    </>
  );
}

export default ShapeToolOptions;
