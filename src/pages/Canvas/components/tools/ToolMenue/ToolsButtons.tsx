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
import { defaultButtonsBackground } from "../../../data/constants/CanvasConstants";
import ToolButton from "./ToolButton";
import { IconOption } from "../../../data/types/CanvasTypes";
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
            strokeWidth={1}
            size={32}
            fill={CanvasPalet.getColor(pencil.pencilColorId)}
          />
        ),
        action: "drawing",
      },
      {
        icon: <Highlighter strokeWidth={1} size={32} />,
        action: "marker",
      },
      {
        icon: <Eraser size={32} />,
        action: "eraser",
      },
    ],
    [pencil]
  );

  const SelectionOptions = useMemo<IconOption[]>(
    () => [
      {
        icon: <MousePointer2 size={32} />,
        action: "move",
      },
      {
        icon: <SquareDashed size={32} />,
        action: "transform",
      },
    ],
    []
  );
  const ShapesOption = useMemo<IconOption[]>(
    () => [
      {
        icon: <Square size={32} />,
        action: "square",
      },
      {
        icon: <Circle size={32} />,
        action: "circle",
      },
    ],
    []
  );

  return (
    <>
      <div
        className={`p-1 flex pointer-events-auto justify-center items-center gap-4 rounded-2xl  ${defaultButtonsBackground} ${
          inline && "flex-col"
        }`}
      >
        <DropdownSelector options={DrawingOptions} />
        <DropdownSelector options={SelectionOptions} />
        <DropdownSelector options={ShapesOption} />
        <ToolButton
          action="image"
          icon={<Image size={32} className="hover:cursor-pointer" />}
        />
        <ToolButton
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
