import { Eraser } from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline,
} from "../../../../../constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";

const EraserToolMenu = () => {
  const canvasStore = useToolStore();

  return (
    <>
      <div
        className={`cursor-pointer
                ${canvasStore.activeTool === "eraser" && DefaultOutline}
               
               `}
        onClick={() => {
          canvasStore.setActiveTool("eraser");
        }}
      >
        <Eraser size={DefaultIconSize} />
      </div>
    </>
  );
}

export default EraserToolMenu;
