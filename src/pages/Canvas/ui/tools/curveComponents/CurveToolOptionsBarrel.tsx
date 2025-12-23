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

const CurveToolOptions = () => {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const setLastCurveTool = useToolStore((state) => state.setLastCurveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useToolStore().activeTool;

  return (
    <>
      <ToolOptionHeaderComponent/>
      <div
        className={`cursor-pointer  ${
          activeTool === "pen" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("pen"); setLastCurveTool("pen");}}
      >
        <Pen size={DefaultIconSize} />
      </div>
      <div
        className={`cursor-pointer ${
          activeTool === "marker" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("marker"); setLastCurveTool("marker"); }}
      >
        <Highlighter size={DefaultIconSize} />
      </div>
      <ArrayDivider direction={toolOptionsDirection} />
      {activeTool === "pen" && <PenToolQuickOptions />}
      {activeTool === "marker" && <MarkerToolsQuickOptions />}
    </>
  );
}

export default CurveToolOptions;
