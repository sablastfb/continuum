import { Highlighter, Pencil } from "lucide-react";
import {
  DefaultButtonsBackground,
  DefaultIconSize,
  DefaultOutline,
} from "../../../data/types/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import useCanvasStore from "../../../data/store/CanvasStore";
import CurveAdvanceSettings from "./CurveAdvanceSettings";
import { useState } from "react";

function CurveToolMenue() {
  const toolStore = useToolStore();
  const [domo, setdomo] = useState<boolean>(false);
  return (
    <>
      {domo && (
        <div
          className={`${DefaultButtonsBackground} rounded-lg min-w-[20vw]  min-h-[20vw] pointer-events-auto `}
        >
          <CurveAdvanceSettings />;
        </div>
      )}
      <div
        className={`cursor-pointer   ${
          toolStore.activeTool === toolStore.lastCureveTool && DefaultOutline
        }`}
        onClick={() => {
          toolStore.setActiveTool(toolStore.lastCureveTool);
        }}
        onDoubleClick={() => {
          setdomo(!domo);
        }}
      >
        {toolStore.lastCureveTool === "pen" && (
          <Pencil size={DefaultIconSize} />
        )}
        {toolStore.lastCureveTool === "highlighter" && (
          <Highlighter size={DefaultIconSize} />
        )}
      </div>
    </>
  );
}

export default CurveToolMenue;
