import { JSX } from "react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { ToolType } from "../../../features/tools/ToolManager";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";


export type IconOption = {
  icon: JSX.Element;
  action: ToolType;
};

function ToolButton({ icon, action }: IconOption) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const activeTool = useCanvasStore().activeTool;

  return (
    <>
      <div
        className={`flex items-center hover:cursor-pointer p-1 ${
          action === activeTool ? `${defaultOutlineColor} rounded-xl` : ""
        }`}
        onClick={() => {
          setActiveTool(action);
        }}
      >
        {icon}
      </div>
    </>
  );
}

export default ToolButton;
