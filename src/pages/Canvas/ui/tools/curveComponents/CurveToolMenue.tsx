import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { useCurveStore } from "../../../data/store/PenStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const CurveToolMenue = () => {
  const toolStore = useToolStore();
  const penStore = useCurveStore();
  return (
    <>
      <div
        className={`cursor-pointer   ${
          toolStore.activeTool === toolStore.lastCureveTool && DefaultOutline
        }`}
        onClick={() => {
          toolStore.setActiveTool(toolStore.lastCureveTool);
        }}
    
      >
        {toolStore.lastCureveTool === "pen" && (
        <Pen size={DefaultIconSize} fill={Continuum_Canvas.colorPalet.getColor( penStore.penSettings.colorId )}/>
        )}
        {toolStore.lastCureveTool === "marker" && (
               <Highlighter size={DefaultIconSize} fill={Continuum_Canvas.colorPalet.getColor( penStore.markerSettings.colorId )}/>
       
        )}
      </div>
    </>
  );
}

export default CurveToolMenue;
