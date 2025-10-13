import { useMemo } from "react";
import {
  Circle,
  Eraser,
  Highlighter,
  MousePointer2,
  PenLine,
  Clipboard,
  Redo,
  Square,
  SquareDashed,
  Undo,
  Hexagon,
  Octagon,
  Pen,
  Image,
  Pencil,
  Type,
  Link,
  Lasso,
  Ruler,
  LayoutDashboard,
  Camera,
  ChevronRight,
  ChevronDown,
  CircleChevronDown,
} from "lucide-react";
import ArrayDivider from "../../misc/ArrayDivider";
import {
  defaultButtonsBackground,
  defaultIconSize,
} from "../../../data/constants/CanvasConstants";
import { IconOption } from "./ToolButton";
import { Continuum_CanvasPalet } from "../../../data/palet/PaletContainer";
import { usePencileStore } from "../../../data/store/PencileStore";
import DropdownToolSelector from "../../misc/DropdownSelector";
import { Continuum_Canvas } from "../../../features/CanvasApp";
import useCanvasStore from "../../../data/store/CanvasStore";
import { useMarkerStore } from "../../../data/store/MarkerStore";
import { useShapesStore } from "../../../data/store/ShapeStore";
import PencileTools from "../ToolOptions/PencileTools";
import MarkerTools from "../ToolOptions/MarkerTool";
import ShapeTool from "../ToolOptions/ShapeTool";
import BookmakrContainer from "../../bookmark/BookMarkComponent";
import BookmankrButton from "../../bookmark/BookmankrButton";

function ToolsMenue() {
  const pencil = usePencileStore();
  const markerStore = useMarkerStore();
  const shapeStore = useShapesStore();
  const historyPosition = useCanvasStore().historyPosition;
  const historyCount = useCanvasStore().historyCount;
  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        icon: (
          <Pen
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(pencil.pencilColorId)}
          />
        ),
        tool: "pencile",
        toolOptionComponent: <PencileTools />,
      },
      {
        icon: <Pencil size={defaultIconSize} />,
        tool: "eraser",
      },
      {
        icon: (
          <Highlighter
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(markerStore.markerColorId)}
          />
        ),
        tool: "marker",
        toolOptionComponent: <MarkerTools />,
      },
      {
        icon: <Eraser size={defaultIconSize} />,
        tool: "eraser",
      },
    ],
    [pencil, markerStore]
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
        icon: (
          <Square
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.square.color
            )}
            stroke={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.square.outlineColor
            )}
          />
        ),
        tool: "square",
        toolOptionComponent: <ShapeTool shapeType={"square"} />,
      },
      {
        icon: (
          <Circle
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.circle.color
            )}
            stroke={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.circle.outlineColor
            )}
          />
        ),
        tool: "circle",
      },
      {
        icon: (
          <Hexagon
            size={defaultIconSize}
            fill={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.hexagon.color
            )}
            stroke={Continuum_CanvasPalet.getColor(
              shapeStore.shapes.hexagon.outlineColor
            )}
          />
        ),
        tool: "hexagon",
      },
      {
        icon: <Octagon size={defaultIconSize} />,
        tool: "poligon",
      },
    ],
    [shapeStore]
  );

  return (
    <>
      <div
        className={`flex pointer-events-auto justify-center items-center gap-4 rounded-md  ${defaultButtonsBackground}   z-50 `}
      >
        <ChevronDown size={defaultIconSize} />
        <div className="w-1 h-10">
          <ArrayDivider orjentation="vertical" />
        </div>

        {/* <DropdownToolSelector options={DrawingOptions} /> */}

        <div>
          {" "}
          <Pen size={defaultIconSize} />
        </div>
        <div>
          <Eraser size={defaultIconSize} />
        </div>
        <div>
          <DropdownToolSelector options={SelectionOptions} />
        </div>
        <div>
          <DropdownToolSelector options={ShapesOption} />
        </div>
        <div>
          <Image size={defaultIconSize} />
        </div>
        <div>
          <Lasso size={defaultIconSize} />
        </div>
        <div>
          <Ruler size={defaultIconSize} />
        </div>
        <div>
          <LayoutDashboard />
        </div>
        <div>
          <Camera />
        </div>
        <div>
          <Type size={defaultIconSize} />
        </div>
        <div>
          <Link size={defaultIconSize} />
        </div>
        <div>
          <Clipboard size={defaultIconSize} />
        </div>
        <div>
          <BookmankrButton />
        </div>
        <div className="w-1 h-10">
          <ArrayDivider orjentation="vertical" />
        </div>

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
            historyPosition >= historyCount - 1
              ? "opacity-50 "
              : "hover:cursor-pointer"
          }
        >
          <Redo size={defaultIconSize} />
        </div>
      </div>
    </>
  );
}

export default ToolsMenue;
