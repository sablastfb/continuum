import { ColorPicker } from "primereact/colorpicker";
import CircleColorPicker from "../CircleColorPicker";
import useCanvasStore from "../../data/CanvasStore";
import CircleThicknesPicker from "../CircleThicknesPicker";

function PencileTools(){
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);
  const setPencileThickens = useCanvasStore((state) => state.setPencileThickens);

    return <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <CircleThicknesPicker thicknes={5} selected={false} />
          <CircleThicknesPicker thicknes={20} selected={false} />
          <CircleThicknesPicker thicknes={30} selected={false} />
          <CircleColorPicker color="blue" selected={true}/> 
          <CircleColorPicker color="red" selected={false}/>
          <CircleColorPicker color="green" selected={false}/>
          <CircleColorPicker color="yellow" selected={false}/>
          <ColorPicker
            format="hex"
            onChange={(e) => setPencileColor(`#${e.value}` as string)}
          />
        </div>
      </div>
    </>
}

export default PencileTools;