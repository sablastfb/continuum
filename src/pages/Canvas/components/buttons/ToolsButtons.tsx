import { useMemo } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { IconOption } from "../../data/ToolsMenueData";
import {
  Circle,
  Eraser,
  Highlighter,
  MousePointer2,
  PenLine,
  Redo,
  Square,
  SquareDashed,
  Type,
  Undo,
} from "lucide-react";
import DropdownToolSelector from "./DropdownToolSelector/DropdownToolSelector";
import ArrayDivider from "../misc/ArrayDivider";
import { defaultCanvasBackground } from "../../data/CanvasConstants";
import ToolButton from "./ToolButton";

function ToolsButtons() {
  const color = useCanvasStore((state) => state.color);

  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        name: "Pen",
        icon: <PenLine strokeWidth={1} size={32} fill={color} />,
        action: "drawing",
      },
      {
        name: "Eraser",
        icon: <Highlighter strokeWidth={1} size={32} fill={color} />,
        action: "eraser",
      },
      {
        name: "Eraser",
        icon: <Eraser size={32} />,
        action: "eraser",
      },
    ],
    [color]
  );

  const SelectionOptions = useMemo<IconOption[]>(
    () => [
      {
        name: "Pen",
        icon: <MousePointer2 size={32} />,
        action: "move",
      },
      {
        name: "Eraser",
        icon: <SquareDashed size={32} />,
        action: "transform",
      },
    ],
    []
  );
  const ShapesOption = useMemo<IconOption[]>(
    () => [
      {
        name: "Square",
        icon: <Square size={32} />,
        action: "square",
      },
      {
        name: "Circle",
        icon: <Circle size={32} />,
        action: "circle",
      },
    ],
    []
  );

  return (
    <>
      <div className=" flex justify-center pb-2 ">
        <div
          className={`flex  pointer-events-auto justify-center items-center gap-4 rounded-2xl min-w-min ${defaultCanvasBackground} p-1`}
        >
          <DropdownToolSelector dropDownOptions={DrawingOptions} />
          <DropdownToolSelector dropDownOptions={SelectionOptions} />
          <DropdownToolSelector dropDownOptions={ShapesOption} />
          <ToolButton
            name=""
            action="eraser"
            icon={<Type size={32} className="hover:cursor-pointer" />}
          />
          <ArrayDivider orjentation="vertical" />
          <Undo color="white" size={32} className="hover:cursor-pointer" />
          <Redo color="white" size={32} className="hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default ToolsButtons;
