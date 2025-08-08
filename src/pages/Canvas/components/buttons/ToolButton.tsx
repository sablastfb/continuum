import { JSX } from "react";
import useCanvasStore from "../../data/CanvasStore";
import { ActiveTool } from "../../data/CanvasTypes";

export type ToolButtonParam = {
  name: string;
  icon: JSX.Element;
  action: ActiveTool;
};

function ToolButton({name, icon, action}: ToolButtonParam) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);

  return (
    <>
      <div
        className="flex items-center hover:cursor-pointer"
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
