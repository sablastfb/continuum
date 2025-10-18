import ArrayDivider from "../../misc/ArrayDivider";
import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../data/types/CanvasConstants";
import useLayoutStore from "../../../data/store/LayoutStore";
import PenToolOptions from "./PenToolsOptions";
import HighlighterToolsOptions from "./HighlighterToolOptions";
import useToolStore from "../../../data/store/ToolStore";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";

function CurveToolOptions() {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const lastCureveTool = useToolStore((state) => state.setLastCureveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useToolStore().activeTool;

  return (
    <>
      <ToolOptionHeaderComponent/>

      <div
        className={`cursor-pointer  ${
          activeTool === "pen" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("pen"); lastCureveTool("pen");}}
      >
        <Pen size={DefaultIconSize} />
      </div>
      <div
        className={`cursor-pointer ${
          activeTool === "highlighter" && DefaultOutlineSelection
        }`}
        onClick={() => {setActiveTool("highlighter"); lastCureveTool("highlighter"); }}
      >
        <Highlighter size={DefaultIconSize} />
      </div>
      <ArrayDivider direction={toolOptionsDirection} />
      {activeTool === "pen" && <PenToolOptions />}
      {activeTool === "highlighter" && <HighlighterToolsOptions />}
    </>
  );
}

export default CurveToolOptions;
