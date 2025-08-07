import { ColorPicker } from "primereact/colorpicker";
import CircleColorPicker from "../misc/CircleColorPicker";
import useCanvasStore from "../../data/CanvasStore";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";

function PencileTools(){
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

    return <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-2  min-w-min">
          <CircleThicknesPicker thicknes={5} selected={false} />
          <CircleThicknesPicker thicknes={20} selected={false} />
          <CircleThicknesPicker thicknes={30} selected={false} />
          <CircleColorPicker color="#1099bb" selected={true}/> 
          <CircleColorPicker color="rgb(220,182,183)" selected={false}/> 
          <CircleColorPicker color="rgb(210,245,214)" selected={false}/>
          <CircleColorPicker color="rgb(215,201,235)" selected={false}/>
          <CircleColorPicker color="rgb(255,240,199)" selected={false}/>
          <CircleColorPicker color="rgb(185,222,240)" selected={false}/>
          <ColorPicker
            format="hex"
            value={"6466f1"}
            onChange={(e) => setPencileColor(`#${e.value}` as string)}
          />
        </div>
      </div>
    </>
}

export default PencileTools;