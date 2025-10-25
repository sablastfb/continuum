import { Highlighter, Pen, Pencil } from "lucide-react";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/types/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import useCanvasStore from "../../../data/store/CanvasStore";
import CurveAdvanceSettings from "./CurveAdvanceSettings";
import { useEffect, useRef, useState } from "react";
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
