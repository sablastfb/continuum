import { Ellipsis, EllipsisVertical } from "lucide-react";
import useLayoutStore from "../../../data/store/LayoutStore";
import { DefaultIconSize } from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";

function ToolOptionHeaderComponent() {
  const toolOptionsDirection = useLayoutStore().toolOptionsDirection;

  return (
    <>
      <div
        className={`flex  gap-1 justify-center items-center ${
          toolOptionsDirection === "horizontal" && " h-full "
        } 
      ${toolOptionsDirection === "vertical" && " flex-col  "}
      
      `}
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
