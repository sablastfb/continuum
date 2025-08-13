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
      className={`w-8 h-8 flex justify-center items-center hover:cursor-pointer  rounded-full ${
        selected ? "ring-2 ring-offset-2 ring-gray-400" : ""
      }`}
    >
      <div
        style={{
          width: ThicknesPalet.getThicknes(thicknesId),
          height: ThicknesPalet.getThicknes(thicknesId) ,
        }}
        className={`bg-amber-100 rounded-full`}
      ></div>
    </div>
  );
}

export default CircleThicknesPicker;
