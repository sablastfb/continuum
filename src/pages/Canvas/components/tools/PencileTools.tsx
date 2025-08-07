import { ColorPicker } from "primereact/colorpicker";
import CircleColorPicker from "../CircleColorPicker";
import useCanvasStore from "../../data/CanvasStore";

function PencileTools(){
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

    return <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <CircleColorPicker color="blue" selected={true}></CircleColorPicker>
          <CircleColorPicker color="red" selected={false}></CircleColorPicker>
          <CircleColorPicker color="green" selected={false}></CircleColorPicker>
          <CircleColorPicker color="yellow" selected={false}></CircleColorPicker>
          <ColorPicker
            format="hex"
            onChange={(e) => setPencileColor(`#${e.value}` as string)}
          />
        </div>
      </div>
    </>
}

export default PencileTools;