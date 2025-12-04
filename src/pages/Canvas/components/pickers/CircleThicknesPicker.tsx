import {
  CirclePickeSize,
  DefaultOutlineColor,
} from "../../data/constants/CanvasConstants";
import {
  ThicknesId,
} from "../../data/thicknes/ThickneContainer";
import { Continuum_Canvas } from "../../features/CanvasApp";

const baseSize = 4;
const sigma = 6;
const maxSize = 30;

export type CircleThicknesPickerParm = {
  thicknesId: ThicknesId;
  selected: boolean;
  action: () => void;
};

const CircleThicknesPicker = ({
  thicknesId,
  selected,
  action,
}: CircleThicknesPickerParm) => {
  return (
    <div>
      <div
      
        onClick={() => action()}
        className={` ${CirclePickeSize} flex items-center justify-center  hover:cursor-pointer  rounded-full outline-2 select-none  ${
          selected ? `${DefaultOutlineColor}` : "outline-gray-500"
        }`}
      >
        <div
          style={{
            width:
              baseSize *
              (1 + (sigma * Continuum_Canvas.thicknesPalet.getThicknes(thicknesId)) / maxSize),
            height:
              baseSize *
              (1 + (sigma *  Continuum_Canvas.thicknesPalet.getThicknes(thicknesId)) / maxSize),
          }}
          className={`bg-amber-600 dark:bg-amber-100 rounded-full max-w-7 max-h-7 items-center`}
        ></div>
      </div>
    </div>
  );
};

export default CircleThicknesPicker;
