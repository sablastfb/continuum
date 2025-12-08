import { Circle, HexagonIcon, Square } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutlineColor,
} from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import useLayoutStore from "../../../data/store/LayoutStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";

import CircleColorPicker from "../../pickers/CircleColorPicker";
import { useShapesStore } from "../../../data/store/ShapeStore";

export const ShapeToolShapePicker = () => {
  const store = useShapesStore();

  return (
    <>
      <div
        onClick={() => store.updateShape({ shape: "square" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.shape === "square" ? DefaultOutlineColor : ""
        }`}
      >
        <Square size={DefaultIconSize} />
      </div>
      <div
        onClick={() => store.updateShape({ shape: "circle" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.shape === "circle" ? DefaultOutlineColor : ""
        }`}
      >
        <Circle size={DefaultIconSize} />
      </div>
      <div
        onClick={() => store.updateShape({ shape: "poligon" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.shape === "poligon" ? DefaultOutlineColor : ""
        }`}
      >
        <HexagonIcon size={DefaultIconSize} />
      </div>
    </>
  );
};

export const ShapeToolFillPicker = () => {
  const store = useShapesStore();
  return (
    <>
      <div
        onClick={() => store.updateShape({ fillType: "outline-and-fill" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType === "outline-and-fill" ? DefaultOutlineColor : ""
        }`}
      >
        <Square
          className="fill-gray-400  stroke-3 stroke-gray-100"
          size={DefaultIconSize}
        />
      </div>
      <div
        onClick={() => store.updateShape({ fillType: "fill-only" })}
        className={` rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType === "fill-only" ? DefaultOutlineColor : ""
        }`}
      >
        <Square
          fill="white"
          className="fill-gray-400 stroke-0 "
          size={DefaultIconSize}
        />
      </div>
      <div
        onClick={() => store.updateShape({ fillType: "outline-only" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType === "outline-only" ? DefaultOutlineColor : ""
        }`}
      >
        <Square
          fill="none"
          className="  stroke-3 stroke-gray-100"
          strokeWidth={2}
          size={DefaultIconSize}
        />
      </div>
    </>
  );
};

const ShapeToolQuickOptions = () => {
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const shapeStore = useShapesStore();

  return (
    <>
      <ToolOptionHeaderComponent />
      <ShapeToolShapePicker />
      <ArrayDivider direction={toolOptionsDirection} />
      <ShapeToolFillPicker />
      <ArrayDivider direction={toolOptionsDirection} />
      <div className={`flex gap-3 ${toolOptionsDirection === 'vertical' ? 'flex-col' : ''}`}>
        {shapeStore.fillColors.map((id) => (
          <CircleColorPicker
            key={id}
            colorId={id}
            selected={id === shapeStore.fillColorId}
            action={() => {shapeStore.updateShape({fillColorId: id})}}
          />
        ))}
      </div>
      <ArrayDivider direction={toolOptionsDirection} />

      <div className={`flex gap-3 ${toolOptionsDirection === 'vertical' ? 'flex-col' : ''}`}>
        {shapeStore.strokeColors.map((id) => (
          <CircleColorPicker
            key={id}
            colorId={id}
            selected={id === shapeStore.strokeColorId}
            variant="stroek"
            action={() => {shapeStore.updateShape({strokeColorId: id})}}
          />
        ))}
      </div>
    </>
  );
};

export default ShapeToolQuickOptions;
