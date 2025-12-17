import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../../../constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { useCurveStore } from "../../../data/store/PenStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const CurveToolMenu = () => {
  const toolStore = useToolStore();
  const penStore = useCurveStore();
  return (
    <>
      <div
        className={`cursor-pointer   ${
          toolStore.activeTool === toolStore.lastCurveTool && DefaultOutline
        }`}
        onClick={() => {
          toolStore.setActiveTool(toolStore.lastCurveTool);
        }}
      >
        {toolStore.lastCurveTool === "pen" && (
          <Pen
            size={DefaultIconSize}
            fill={Continuum_Canvas.colorPalette.getColor(
              penStore.penSettings.colorId
            )}
          />
        )}
        {toolStore.lastCurveTool === "marker" && (
          <Highlighter
            size={DefaultIconSize}
            fill={Continuum_Canvas.colorPalette.getColor(
              penStore.markerSettings.colorId
            )}
          />
        )}
      </div>
    </>
  );
};

export default CurveToolMenu;
