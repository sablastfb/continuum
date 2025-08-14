import { useMemo } from "react";
import {
  Circle,
  Eraser,
  Highlighter,
  MousePointer2,
  PenLine,
  Image,
  Redo,
  Square,
  SquareDashed,
  Type,
  Undo,
} from "lucide-react";
import DropdownToolSelector from "./DropdownToolSelector/DropdownToolSelector";
import ArrayDivider from "../misc/ArrayDivider";
import { defaultCanvasBackground } from "../../data/constants/CanvasConstants";
import ToolButton from "./ToolButton";
import { IconOption } from "../../data/types/CanvasTypes";
import useCanvasStore from "../../data/store/CanvasStore";
import { CanvasPalet } from "../../data/container/PaletContainer";

function ToolsButtons() {
  const pencil = useCanvasStore((state) => state.pencil);
  const toolButtonPosition = useCanvasStore().canvasSettings.layout.toolButtons;
  const inline =
    toolButtonPosition === "left" || toolButtonPosition === "right";
  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        name: "Pen",
        icon: (
          <PenLine
            strokeWidth={1}
            size={32}
            fill={CanvasPalet.getColor(pencil.pencilColorId)}
          />
        ),
        action: "drawing",
      },
      {
        name: "marker",
        icon: <Highlighter strokeWidth={1} size={32} />,
        action: "marker",
      },
      {
        name: "Eraser",
        icon: <Eraser size={32} />,
        action: "eraser",
      },
    ],
    [pencil]
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
      <div
        className={`flex pointer-events-auto justify-center items-center gap-4 rounded-2xl  ${defaultCanvasBackground} ${
          inline && "flex-col"
        }`}
      >
        <DropdownToolSelector dropDownOptions={DrawingOptions} />
        <DropdownToolSelector dropDownOptions={SelectionOptions} />
        <DropdownToolSelector dropDownOptions={ShapesOption} />
        <ToolButton
          name=""
          action="image"
          icon={<Image size={32} className="hover:cursor-pointer" />}
        />
        <ToolButton
          name=""
          action="circle"
          icon={<Type size={32} className="hover:cursor-pointer" />}
        />
        {inline ? (
          <div className="w-10 h-1">
            <ArrayDivider orjentation="horizontal" />
          </div>
        ) : (
          <div className="w-1 h-10">
            <ArrayDivider orjentation="vertical" />
          </div>
        )}

        <div>
          <Undo size={32} className="hover:cursor-pointer" />
        </div>
        <div>
          <Redo size={32} className="hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default ToolsButtons;
