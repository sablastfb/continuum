import ArrayDivider from "../../misc/ArrayDivider";
import { Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../data/constants/CanvasConstants";
import useLayoutStore from "../../../data/store/LayoutStore";
import PenToolOptions from "./PenToolsOptions";
import HighlighterToolsOptions from "./HighlighterToolOptions";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";
import useToolStore from "../../../data/store/ToolStore";

function CurveToolOptions() {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useToolStore().activeTool;

  return (
    <>
      <ToolOptionHeaderComponent/>

      <div
        className={`cursor-pointer  ${
          activeTool === "pen" && DefaultOutlineSelection
        }`}
        onClick={() => setActiveTool("pen")}
      >
        <Pen size={DefaultIconSize} />
      </div>
      <div
        className={`cursor-pointer ${
          activeTool === "highlighter" && DefaultOutlineSelection
        }`}
        onClick={() => setActiveTool("highlighter")}
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
