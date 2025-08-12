import { JSX } from "react";
import { ToolType } from "../../data/types/CanvasTypes";
import useCanvasStore from "../../data/store/CanvasStore";

export type ToolButtonParam = {
  name: string;
  icon: JSX.Element;
  action: ToolType;
};

function ToolButton({icon, action}: ToolButtonParam) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const activeTool = useCanvasStore().activeTool;

  return (
    <>
      <div
        className={`flex items-center hover:cursor-pointer p-1 ${action === activeTool ? 'outline-3 rounded-xl' : ''}`}
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
