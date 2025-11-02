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
import { Continuum_Canvas } from "../../../features/CanvasApp";
import CircleColorPicker from "../../pickers/CircleColorPicker";

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
        onClick={() => store.updateShape({ fillType: "outline-fill" })}
        className={`rounded-xl hover:cursor-pointer flex justify-center items-center ${
          store.fillType === "outline-fill" ? DefaultOutlineColor : ""
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
  const store = useShapesStore();

  return (
    <>
      <ToolOptionHeaderComponent />
      <ShapeToolShapePicker />
      <ArrayDivider direction={toolOptionsDirection} />
      <ShapeToolFillPicker />
      <ArrayDivider direction={toolOptionsDirection} />
      <div className="flex">
        {store.fillColors.map((id) => (
          <CircleColorPicker
            key={id}
            colorId={id}
            selected={false}
            action={() => {}}
          />
        ))}
      </div>
    </>
  );
};

export default ShapeToolQuickOptions;
