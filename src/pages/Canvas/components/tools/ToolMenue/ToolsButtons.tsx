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
import ArrayDivider from "../../misc/ArrayDivider";
import {
  defaultButtonsBackground,
  defaultIconSize,
} from "../../../data/constants/CanvasConstants";
import ToolButton, { IconOption } from "./ToolButton";
import { CanvasPalet } from "../../../data/container/PaletContainer";
import { usePencileStore } from "../../../data/store/PencileStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import DropdownSelector from "./DropdownSelector";

function ToolsButtons() {
  const pencil = usePencileStore();
  const toolButtonPosition = useSettingsStore().layout.toolMenue;
  const inline =
    toolButtonPosition === "left" || toolButtonPosition === "right";
  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        icon: (
          <PenLine
            size={defaultIconSize}
            fill={CanvasPalet.getColor(pencil.pencilColorId)}
          />
        ),
        tool: "drawing",
      },
      {
        icon: <Highlighter size={defaultIconSize} />,
        tool: "marker",
      },
      {
        icon: <Eraser size={defaultIconSize} />,
        tool: "eraser",
      },
    ],
    [pencil]
  );

  const SelectionOptions = useMemo<IconOption[]>(
    () => [
      {
        icon: <MousePointer2 size={defaultIconSize} />,
        tool: "move",
      },
      {
        icon: <SquareDashed size={defaultIconSize} />,
        tool: "transform",
      },
    ],
    []
  );
  const ShapesOption = useMemo<IconOption[]>(
    () => [
      {
        icon: <Square size={defaultIconSize} />,
        tool: "square",
      },
      {
        icon: <Circle size={defaultIconSize} />,
        tool: "circle",
      },
    ],
    []
  );

  return (
    <>
      <div
        className={` p-1 flex pointer-events-auto justify-center items-center gap-4 rounded-2xl  ${defaultButtonsBackground} ${
          inline && "flex-col"
        }`}
      >
        <DropdownSelector options={DrawingOptions} />
        <DropdownSelector options={SelectionOptions} />
        <DropdownSelector options={ShapesOption} />
        <ToolButton
          tool="image"
          icon={
            <Image size={defaultIconSize} className="hover:cursor-pointer" />
          }
        />
        <ToolButton
          tool="circle"
          icon={
            <Type size={defaultIconSize} className="hover:cursor-pointer" />
          }
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
          <Undo size={defaultIconSize} className="hover:cursor-pointer" />
        </div>
        <div>
          <Redo size={defaultIconSize} className="hover:cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default ToolsButtons;
