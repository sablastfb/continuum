import {
  ArrowDown,
  Circle,
  Download,
  Eraser,
  Home,
  Info,
  MousePointer2,
  PenLine,
  Redo,
  Settings,
  Square,
  SquareDashed,
  Type,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import useCanvasStore from "../../data/CanvasStore";
import { Canvas } from "../../services/CanvasService";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownToolSelector from "../misc/DropdownToolSelector/DropdownToolSelector";
import { IconOption } from "../../data/ToolsMenueData";
function ToolsMenue() {
  const zoome = useCanvasStore((state) => state.zoome);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);
  const navigate = useNavigate();
  const [toolsMenueVisible, setToolsMenueVisible] = useState<boolean>(false);
  const background = "bg-white/10 backdrop-blur-sm";
  const color = useCanvasStore((state) => state.color);

  const DrawingOptions = useMemo<IconOption[]>(
    () => [
      {
        name: "Pen",
        icon: <PenLine color={color} size={32} />,
        action: "drawing",
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
        icon: <SquareDashed  size={32} />,
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
        icon: <Circle  size={32} />,
        action: "circle",
      },
    ],
    []
  );


  return (
    <div className="flex bottom-0 left-0 right-0">
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div
          className={`flex justify-center items-center ${background} rounded-full p-1 absolute hover:cursor-pointer
          transition-all ease-in-out
            ${toolsMenueVisible ? "bottom-1" : "bottom-15"}
            `}
          onClick={() => {
            setToolsMenueVisible(!toolsMenueVisible);
          }}
        >
          <ArrowDown
            color="white"
            size={25}
            className={`transition-all ${
              toolsMenueVisible ? "rotate-180" : ""
            } `}
          />
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0
            transition-all duration-300 ease-in-out 
            ${
              toolsMenueVisible
                ? " translate-y-10 pointer-events-none hidden"
                : "  translate-y-0 opacity-100 "
            }
            `}
      >
        <div className=" flex justify-center pb-2">
          <div
            className={`flex justify-center items-center gap-4 rounded-2xl min-w-min ${background} p-1`}
          >
            <DropdownToolSelector dropDownOptions={DrawingOptions} />
            <DropdownToolSelector dropDownOptions={SelectionOptions} />
            <DropdownToolSelector dropDownOptions={ShapesOption} />
            <Type  size={32} className="hover:cursor-pointer"/>
            <Undo color="white" size={32} className="hover:cursor-pointer" />
            <Redo color="white" size={32} className="hover:cursor-pointer" />
          </div>
        </div>
        <div className="absolute left-0 bottom-0  p-2 flex justify-center">
          <div className="rounded-2xl p-2 bg-white/10 backdrop-blur-sm flex  gap-4">
            <div
              onClick={() => {
                navigate("/main-menue");
              }}
            >
              <Home color="white" size={30} className="hover:cursor-pointer" />
            </div>
            <Settings
              color="white"
              size={30}
              className="hover:cursor-pointer"
              onClick={() => {
                setSettingVisible(true);
              }}
            />
            <Download
              color="white"
              size={30}
              className="hover:cursor-pointer"
              onClick={() => {
                setExportVisible(true);
              }}
            />
            <Info
              color="white"
              size={30}
              className="hover:cursor-pointer"
              onClick={() => {
                setInfoVisible(true);
              }}
            />
          </div>
        </div>
        <div className="absolute right-0 bottom-0 p-2">
          <div className="flex justify-center items-center rounded-2xl p-2 gap-2 bg-white/10 backdrop-blur-sm text-gray-300 text-xl">
            <ZoomIn
              className="hover:cursor-pointer"
              size={25}
              onClick={() => Canvas.zoom(1)}
            />
            {(zoome * 100).toFixed(1)}%
            <ZoomOut
              className="hover:cursor-pointer"
              size={25}
              onClick={() => Canvas.zoom(-1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsMenue;
