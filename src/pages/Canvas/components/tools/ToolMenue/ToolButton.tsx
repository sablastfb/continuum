import { JSX } from "react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { ToolType } from "../../../features/tools/ToolManager";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";
import { Canvas } from "../../../features/service/CanvasApp";


export type IconOption = {
  icon: JSX.Element;
  tool: ToolType;
};

function ToolButton({ icon, tool }: IconOption) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const activeTool = useCanvasStore().activeTool;

  return (
    <>
      <div
        className={`flex items-center hover:cursor-pointer p-1 ${
          tool === activeTool ? `${defaultOutlineColor} rounded-xl` : ""
        }`}
        onClick={() => {
          setActiveTool(tool);
        }}
      >
        {icon}
      </div>
    </>
  );
}

export default ToolButton;
