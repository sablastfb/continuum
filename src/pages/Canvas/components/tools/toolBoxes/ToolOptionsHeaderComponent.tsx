import { Ellipsis, EllipsisVertical } from "lucide-react";
import useLayoutStore from "../../../data/store/LayoutStore";
import { DefaultIconSize } from "../../../data/types/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";
import useCanvasStore from "../../../data/store/CanvasStore";

function ToolOptionHeaderComponent() {
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
  const canvasStore = useCanvasStore();

  return (
    <>
      <div
        className={`flex  gap-1 justify-center items-center ${
          toolOptionsDirection === "horizontal" && " h-full "
        } 
      ${toolOptionsDirection === "vertical" && " flex-col  "}
      
      `}
        onClick={() => {
          canvasStore.setAdvanceTools(!canvasStore.advanceToolsActive);
        }}
      >
        {toolOptionsDirection === "horizontal" ? (
          <EllipsisVertical size={DefaultIconSize} />
        ) : (
          <Ellipsis size={DefaultIconSize} />
        )}
        <ArrayDivider direction={toolOptionsDirection} />
      </div>
    </>
  );
}
export default ToolOptionHeaderComponent;
