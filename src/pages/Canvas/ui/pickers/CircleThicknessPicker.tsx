import {
  CirclePickSize,
  DefaultOutlineColor,
} from "../../../../constants/CanvasConstants";
import { Continuum_Canvas } from "../../features/CanvasApp";
import {ThicknessId} from "../../data/thicknes/ThickneContainer.ts";

const baseSize = 4;
const sigma = 6;
const maxSize = 30;

export type CircleThicknessPickerParm = {
  thicknessId: ThicknessId;
  selected: boolean;
  action: () => void;
};

const CircleThicknessPicker = ({
  thicknessId,
  selected,
  action,
}: CircleThicknessPickerParm) => {
  return (
    <div>
      <div
        onClick={() => action()}
        className={` ${CirclePickSize} flex items-center justify-center  hover:cursor-pointer  rounded-full outline-2 select-none  ${
          selected ? `${DefaultOutlineColor}` : "outline-gray-500"
        }`}
      >
        <div
          style={{
            width:
              baseSize *
              (1 + (sigma * Continuum_Canvas.thicknessPalette.getThickness(thicknessId)) / maxSize),
            height:
              baseSize *
              (1 + (sigma *  Continuum_Canvas.thicknessPalette.getThickness(thicknessId)) / maxSize),
          }}
          className={`bg-amber-600 dark:bg-amber-100 rounded-full max-w-7 max-h-7 items-center`}
        ></div>
      </div>
    </div>
  );
};

export default CircleThicknessPicker;
