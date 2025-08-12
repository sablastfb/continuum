import CircleColorPicker from "../misc/CircleColorPicker";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";
import ArrayDivider from "../misc/ArrayDivider";
import useCanvasStore from "../../data/store/CanvasStore";

function PencileTools() {
  const pencileSettings = useCanvasStore();
  const pencilColor = useCanvasStore().pencilColor;
  return (
    <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2 pointer-events-none">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1  min-w-min pointer-events-auto">

          {pencileSettings.canvasSettings.pencile.thicknes.map((color, ix) => {
            return <CircleThicknesPicker thicknes={color} selected={false} key={ix} />;
          })}

          <ArrayDivider orjentation="horizontal" />
          {pencileSettings.canvasSettings.pencile.colors.map((colorId, ix) => {
            return <CircleColorPicker colorId={colorId} key={ix} selected={colorId === pencilColor} />;
          })}
        </div>
      </div>
    </>
  );
}

export default PencileTools;
