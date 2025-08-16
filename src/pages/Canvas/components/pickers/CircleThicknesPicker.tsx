import {
  circlePickeSize,
  defaultOutlineColor,
} from "../../data/constants/CanvasConstants";
import {
  ThicknesId,
  ThicknesPalet,
} from "../../data/container/ThickneContainer";
import { usePencileStore } from "../../data/store/PencileStore";

const baseSize = 4;
const sigma = 6;
const maxSize = 30;


export type CircleThicknesPickerParm = {
  thicknesId: ThicknesId;
  selected: boolean;
};

function CircleThicknesPicker({
  thicknesId,
  selected,
}: CircleThicknesPickerParm) {
  const setPencileThickens = usePencileStore(
    (state) => state.setPencileThickens
  );

  return (
    <div
      onClick={() => {
        setPencileThickens({
          thicknes: ThicknesPalet.getThicknes(thicknesId),
          thicknesId: thicknesId,
        });
      }}
      className={` ${circlePickeSize} flex items-center justify-center  hover:cursor-pointer  rounded-full outline-2  ${
        selected ? `${defaultOutlineColor}` : "outline-gray-500"
      }`}
    >
      <div
        style={{
          width: baseSize * (1 + (sigma * ThicknesPalet.getThicknes(thicknesId)) / maxSize),
          height: baseSize * (1 + (sigma * ThicknesPalet.getThicknes(thicknesId)) / maxSize),
        }}
        className={`bg-amber-600 dark:bg-amber-100 rounded-full max-w-7 max-h-7 items-center`}
      ></div>
    </div>
  );
}

export default CircleThicknesPicker;
