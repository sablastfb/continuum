import { Circle, HexagonIcon, Square } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutlineColor,
} from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";
import {
  ShapeData,
  ShapeStore,
  useShapesStore,
} from "../../../data/store/ShapeStore";

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

export const ShapeToolFill = () => {
  const store = useShapesStore();
  return (
    <>
      <div
        onClick={() => store.updateShape({fillType:'outline-fill'})}
        className={`cursor-pointer rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType === 'outline-fill' ? DefaultOutlineColor : ""
        }`}
      >
        <Square className="fill-gray-400  stroke-3 stroke-gray-100" size={DefaultIconSize}/>
      </div>
      <div
        onClick={() => store.updateShape({fillType:"fill-only"})}
        className={`cursor-pointer rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType ===  "fill-only" ? DefaultOutlineColor : ""
        }`}
      >
        <Square fill="white" className="fill-gray-400 stroke-0 " size={DefaultIconSize} />
      </div>
      <div
        onClick={() =>  store.updateShape({fillType:'outline-only'})}
        className={`cursor-pointer rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType ==="outline-only"? DefaultOutlineColor : ""
        }`}
      >
        <Square fill="none"  className="  stroke-3 stroke-gray-100" strokeWidth={2} size={DefaultIconSize} />
      </div>
    </>
  );
};

const ShapeToolQuickOptions = () => {
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  return (
    <>
      <ToolOptionHeaderComponent />
      {/* shapes */}
      <Square size={DefaultIconSize} />
      <Circle size={DefaultIconSize} />
      <HexagonIcon size={DefaultIconSize} />
      <ArrayDivider direction={toolOptionsDirection} />
      <ShapeToolFill />
    </>
  );
};

export default ShapeToolQuickOptions;
