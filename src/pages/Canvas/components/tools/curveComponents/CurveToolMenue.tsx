import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/types/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { usePenStore } from "../../../data/store/PenStore";
import { useMarkerStore } from "../../../data/store/MarkerStore";
import { Continuum_CanvasPalet } from "../../../data/palet/PaletContainer";

const CurveToolMenue = () => {
  const toolStore = useToolStore();
  const penStore = usePenStore();
  const markerStore = useMarkerStore();
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
        <Pen size={DefaultIconSize} fill={Continuum_CanvasPalet.getColor( penStore.penColorId )}/>
        )}
        {toolStore.lastCureveTool === "highlighter" && (
               <Highlighter size={DefaultIconSize} fill={Continuum_CanvasPalet.getColor( markerStore.markerColorId )}/>
       
        )}
      </div>
    </>
  );
}

export default CurveToolMenue;
