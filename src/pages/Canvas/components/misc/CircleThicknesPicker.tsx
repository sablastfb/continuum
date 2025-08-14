import { ThicknesPalet } from "../../data/container/ThickneContainer";
import useCanvasStore from "../../data/store/CanvasStore";
import { ThicknesId } from "../../data/types/CanvasTypes";

export type CircleThicknesPickerParm = {
  thicknesId: ThicknesId;
  selected: boolean;
};

function CircleThicknesPicker({
  thicknesId,
  selected,
}: CircleThicknesPickerParm) {
  const setPencileThickens = useCanvasStore(
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
      className={`w-8 h-8 flex justify-center items-center hover:cursor-pointer  rounded-full outline-1  ${
        selected ? "ring-5 ring-amber-300 dark:ring-amber-500"  : ""
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
