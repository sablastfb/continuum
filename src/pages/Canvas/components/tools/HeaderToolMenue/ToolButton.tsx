import { JSX, useRef, useState } from "react";
import useCanvasStore from "../../../data/store/CanvasStore";
import { Continuum_ToolManager } from "../../../features/tools/ToolManager";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";
import { OverlayPanel } from "primereact/overlaypanel";

export type IconOption = {
  icon: JSX.Element;
  tool: Continuum_ToolManager.ToolType;
  toolOptionComponent?: JSX.Element; 
};

function ToolButton({ icon, tool, toolOptionComponent }: IconOption) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const activeTool = useCanvasStore().activeTool;
  const [openToolSettings, setOpenToolSettings] = useState<boolean>(false);
  const op = useRef<OverlayPanel>(null);

  return (
    <>
      <OverlayPanel ref={op}>
        {toolOptionComponent}
      </OverlayPanel>

      <div
        className={`flex items-center hover:cursor-pointer p-1 ${
          tool === activeTool ? `${defaultOutlineColor} rounded-xl` : ""
        }`}
        onClick={() => {
          setActiveTool(tool);
        }}
        onDoubleClick={(e) => {
          if (toolOptionComponent){
             op.current!.toggle(e);
          }
          setOpenToolSettings(!openToolSettings);
        }}
      >
        {icon}
      </div>
    </>
  );
}

export default ToolButton;
