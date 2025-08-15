import { defaultOutlineColor } from "../../data/constants/CanvasConstants";
import { ThicknesId, ThicknesPalet } from "../../data/container/ThickneContainer";
import { usePencileStore } from "../../data/store/PencileStore";

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
      className={`w-8 h-8 flex justify-center items-center hover:cursor-pointer  rounded-full outline-2  ${
        selected ? `${defaultOutlineColor}`  : ""
      }`}
    >
      <div
        style={{
          width: ThicknesPalet.getThicknes(thicknesId),
          height: ThicknesPalet.getThicknes(thicknesId)
        }}
        className={`bg-amber-600 dark:bg-amber-100 rounded-full`}
      ></div>
    </div>
  );
}

export default CircleThicknesPicker;
