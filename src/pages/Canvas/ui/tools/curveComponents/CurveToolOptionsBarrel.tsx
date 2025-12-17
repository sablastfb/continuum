import ArrayDivider from "../../misc/ArrayDivider";
import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../../../constants/CanvasConstants";
import useLayoutStore from "../../../data/store/LayoutStore";
import PenToolQuickOptions from "./PenToolsQuickOptions";
import MarkerToolsQuickOptions from "./MarkerToolQuickOptions";
import useToolStore from "../../../data/store/ToolStore";
import ToolOptionHeaderComponent from "../../components/ToolOptionsHeaderComponent";
import { useCurveStore } from "../../../data/store/PenStore";
import { Continuum_Canvas } from "../../../features/CanvasApp";

const CurveToolOptions = () => {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const lastCurveTool = useToolStore((state) => state.setLastCurveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useToolStore().activeTool;
  const penStore = useCurveStore();

  return (
    <>
      <ToolOptionHeaderComponent/>
      <div
        className={`cursor-pointer  ${
          activeTool === "pen" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("pen"); lastCurveTool("pen");}}
      >
        <Pen size={DefaultIconSize} fill={Continuum_Canvas.colorPalette.getColor( penStore.penSettings.colorId )}/>
      </div>
      <div
        className={`cursor-pointer ${
          activeTool === "marker" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("marker"); lastCurveTool("marker"); }}
      >
        <Highlighter size={DefaultIconSize} fill={Continuum_Canvas.colorPalette.getColor( penStore.markerSettings.colorId )}/>
      </div>
      <ArrayDivider direction={toolOptionsDirection} />
      {activeTool === "pen" && <PenToolQuickOptions />}
      {activeTool === "marker" && <MarkerToolsQuickOptions />}
    </>
  );
}

export default CurveToolOptions;
