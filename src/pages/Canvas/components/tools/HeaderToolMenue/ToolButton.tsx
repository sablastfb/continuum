import { JSX } from "react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { Continuum_ToolManager } from "../../../features/tools/ToolManager";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";


export type IconOption = {
  icon: JSX.Element;
  tool: Continuum_ToolManager.ToolType;
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
