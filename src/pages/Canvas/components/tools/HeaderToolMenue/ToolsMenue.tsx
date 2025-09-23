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
  Hexagon,
  Octagon,
} from "lucide-react";
import ArrayDivider from "../../misc/ArrayDivider";
import {
  defaultButtonsBackground,
  defaultIconSize,
} from "../../../data/constants/CanvasConstants";
import ToolButton, { IconOption } from "./ToolButton";
import { Continuum_CanvasPalet } from "../../../data/palet/PaletContainer";
import { usePencileStore } from "../../../data/store/PencileStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import DropdownSelector from "../../misc/DropdownSelector";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import useCanvasStore from "../../../data/store/CanvasStore";

function ToolsMenue() {
  const pencil = usePencileStore();
  const toolButtonPosition = useSettingsStore().layout.toolMenue;
  const historyPosition = useCanvasStore().historyPosition;
  const historyCount = useCanvasStore().historyCount;
  const inline =
    toolButtonPosition === "left" || toolButtonPosition === "right";
  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        icon: (
          <PenLine
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(pencil.pencilColorId)}
          />
        ),
        tool: "pencile",
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
        tool: "transform-move",
      },
      {
        icon: <SquareDashed size={defaultIconSize} />,
        tool: "transform-move",
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
      {
        icon: <Hexagon size={defaultIconSize} />,
        tool: "hexagon",
      },
      {
        icon: <Octagon size={defaultIconSize} />,
        tool: "poligon",
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
       
        {inline ? (
          <div className="w-10 h-1">
            <ArrayDivider orjentation="horizontal" />
          </div>
        ) : (
          <div className="w-1 h-10">
            <ArrayDivider orjentation="vertical" />
          </div>
        )}

        <div
          onClick={() => Continuum_Canvas.commandManage.goBack()}
          className={
            historyPosition === -1 ? "opacity-50 " : "hover:cursor-pointer"
          }
        >
          <Undo size={defaultIconSize} />
        </div>
        <div
          onClick={() => Continuum_Canvas.commandManage.goInFuture()}
          className={
            historyPosition >= historyCount-1 ? "opacity-50 " : "hover:cursor-pointer"
          }
        >
          <Redo size={defaultIconSize} />
        </div>
      </div>
    </>
  );
}

export default ToolsMenue;
