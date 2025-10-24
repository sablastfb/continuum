import ArrayDivider from "../../misc/ArrayDivider";
import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../data/types/CanvasConstants";
import useLayoutStore from "../../../data/store/LayoutStore";
import PenToolQuickOptions from "./PenToolsQuickOptions";
import HighlighterToolsQuickOptions from "./HighlighterToolQuickOptions";
import useToolStore from "../../../data/store/ToolStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";
import { usePenStore } from "../../../data/store/PenStore";
import { Continuum_CanvasPalet } from "../../../data/palet/PaletContainer";
import { useHandleStyle } from "primereact/componentbase";
import { useMarkerStore } from "../../../data/store/MarkerStore";

const CurveToolOptions = () => {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const lastCureveTool = useToolStore((state) => state.setLastCureveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useToolStore().activeTool;
  const penStore = usePenStore();
  const markerStore = useMarkerStore();

  return (
    <>
      <ToolOptionHeaderComponent/>
      <div
        className={`cursor-pointer  ${
          activeTool === "pen" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("pen"); lastCureveTool("pen");}}
      >
        <Pen size={DefaultIconSize} fill={Continuum_CanvasPalet.getColor( penStore.penColorId )}/>
      </div>
      <div
        className={`cursor-pointer ${
          activeTool === "highlighter" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("highlighter"); lastCureveTool("highlighter"); }}
      >
        <Highlighter size={DefaultIconSize} fill={Continuum_CanvasPalet.getColor( markerStore.markerColorId )}/>
      </div>
      <ArrayDivider direction={toolOptionsDirection} />
      {activeTool === "pen" && <PenToolQuickOptions />}
      {activeTool === "highlighter" && <HighlighterToolsQuickOptions />}
    </>
  );
}

export default CurveToolOptions;
