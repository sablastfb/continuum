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
      style={{
        width: ThicknesPalet.getThicknes(thicknesId) * 1.5,
        height: ThicknesPalet.getThicknes(thicknesId) * 1.5,
      }}
      className={`hover:cursor-pointer bg-amber-100 rounded-full  ${
        selected ? "ring-2 ring-offset-2 ring-gray-400" : ""
      }`}
    ></div>
  );
}

export default CircleThicknesPicker;
