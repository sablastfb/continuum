import { ThicknesPalet } from "../../data/thicknes/ThickneContainer";
import { usePenStore as usePenStore } from "../../data/store/PenStore";
import CircleColorPicker from "../pickers/CircleColorPicker";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";
import CustomColorPicker from "../pickers/CustomColorPicker";
import ArrayDivider from "../misc/ArrayDivider";
import { Ellipsis, EllipsisVertical, Highlighter, Pen } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutlineColor as DefaultOutlineSelection,
} from "../../data/constants/CanvasConstants";
import useLayoutStore from "../../data/store/LayoutStore";
import PenToolOptions from "./PenToolsOptions";
import useCanvasStore from "../../data/store/CanvasStore";
import HighlighterToolsOptions from "./HighlighterToolOptions";

function CurveToolOptions() {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const activeTool = useCanvasStore().activeTool;

  return (
    <>
      {toolOptionsDirection === "horizontal" ? (
        <EllipsisVertical size={DefaultIconSize} />
      ) : (
        <Ellipsis size={DefaultIconSize} />
      )}
      <ArrayDivider direction={toolOptionsDirection} />
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
