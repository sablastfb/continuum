import { ColorPicker } from "primereact/colorpicker";
import CircleColorPicker from "../misc/CircleColorPicker";
import useCanvasStore from "../../data/CanvasStore";
import CircleThicknesPicker from "../misc/CircleThicknesPicker";
import ArrayDivider from "../misc/ArrayDivider";

function PencileTools(){
  const setPencileColor = useCanvasStore((state) => state.setPencileColor);

    return <>
      <div className="absolute right-0 h-full flex justify-center items-center pr-2">
        <div className="flex flex-col justify-center items-center gap-4  bg-white/10 backdrop-blur-sm rounded-lg p-1  min-w-min">
          <CircleThicknesPicker thicknes={5} selected={false} />
          <CircleThicknesPicker thicknes={20} selected={false} />
          <CircleThicknesPicker thicknes={30} selected={false} />
          <ArrayDivider orjentation="horizontal"/>
          <CircleColorPicker color="#1099bb" colorKey={0}/> 
          <CircleColorPicker color="rgb(220,182,183)"  colorKey={1}/> 
          <CircleColorPicker color="rgb(210,245,214)"  colorKey={2}/>
          <CircleColorPicker color="rgb(215,201,235)"  colorKey={3}/>
          <CircleColorPicker color="rgb(255,240,199)"  colorKey={4}/>
          <CircleColorPicker color="rgb(185,222,240)"  colorKey={5}/>
          {/* <ColorPicker
            format="hex"
            value={"6466f1"}
            onChange={(e) => setPencileColor(`#${e.value}` as string)}
          /> */}
        </div>
      </div>
    </>
}

export default PencileTools;