import {
  ArrowDown,
  Circle,
  Download,
  Eraser,
  Home,
  Info,
  MousePointer2,
  Move,
  PenLine,
  Redo,
  RotateCcw,
  Scaling,
  Settings,
  Square,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import useCanvasStore from "../../data/CanvasStore";
import SettingsDialog from "../dialog/SettingsDialog";
import { Canvas } from "../../services/CanvasService";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { IconOption, iconOptions } from "../../data/ToolsMenueData";
import "./ToolsMenue.css";

function ToolsMenue() {
  const color = useCanvasStore((state) => state.color);
  const zoome = useCanvasStore((state) => state.zoome);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);
  const [toolsMenueVisible, setToolsMenueVisible] = useState<boolean>(false);
  const background = "bg-white/10 backdrop-blur-sm";

  const iconOptionTemplate = (option: IconOption) => {
    return <div className="flex items-center">{option.icon}</div>;
  };

  const selectedIconTemplate = (option: IconOption) => {
    if (option) {
      return <div className="flex items-center">{option.icon}</div>;
    }
    return <span>Select an icon</span>;
  };

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
            className={`flex justify-center items-center gap-4 rounded-2xl p-2  min-w-min ${background}`}
          >
            <div className="flex gap-1">
              <PenLine color={color} size={32} />
              <Dropdown
                className="hover:bg-amber-200"
                value={iconOptions[1]}
                valueTemplate={selectedIconTemplate}
                options={iconOptions}
                itemTemplate={iconOptionTemplate}
              />
            </div>

            {/* <MousePointer2
              color="white"
              size={32}
              className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
            />
            <PenLine
              color={color}
              size={32}
              className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
            /> */}
            {/* <Eraser
              color="white"
              size={32}
              className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
            /> */}
            <div className="flex gap-1">
              <Square
                color="white"
                size={32}
                className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer bg-blue-800"
              />
              <Dropdown
                className="hover:bg-amber-200"
                value={iconOptions[1]}
                valueTemplate={selectedIconTemplate}
                options={iconOptions}
                itemTemplate={iconOptionTemplate}
              />
            </div>

   <div className="flex gap-1">
                        <Move />

              <Dropdown
                className="hover:bg-amber-200"
                value={iconOptions[1]}
                valueTemplate={selectedIconTemplate}
                options={iconOptions}
                itemTemplate={iconOptionTemplate}
              />
            </div>


            <RotateCcw />
            <Scaling />

            <Circle
              color="white"
              size={32}
              className="hover:scale-110 hover:-translate-y-3 transition-all duration-200 cursor-pointer"
            />
            <Undo color="white" size={32} className="hover:cursor-pointer" />
            <Redo color="white" size={32} className="hover:cursor-pointer" />
          </div>
        </div>
        <div className="absolute left-0 bottom-0  p-2 flex justify-center">
          <div className="rounded-2xl p-2 bg-white/10 backdrop-blur-sm flex  gap-4">
            <Home color="white" size={30} className="hover:cursor-pointer" />
            <Settings
              color="white"
              size={30}
              className="hover:cursor-pointer hover:rotate-45 transition-all"
              onClick={() => {
                setSettingVisible(true);
              }}
            />
            <Download
              color="white"
              size={30}
              className="hover:animate-bounce transition-all hover:cursor-pointer"
              onClick={() => {
                setExportVisible(true);
              }}
            />
            <Info
              color="white"
              size={30}
              className="hover:animate-pulse transition-all hover:cursor-pointer"
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
