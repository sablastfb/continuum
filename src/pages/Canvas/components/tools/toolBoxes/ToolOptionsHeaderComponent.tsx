import { Ellipsis, EllipsisVertical } from "lucide-react";
import useLayoutStore from "../../../data/store/LayoutStore";
import { DefaultIconSize } from "../../../data/constants/CanvasConstants";
import ArrayDivider from "../../misc/ArrayDivider";


function ToolOptionHeaderComponent() {
      const toolOptionsDirection = useLayoutStore().toolOptionsDirection;
    
  return (
    <>
      {toolOptionsDirection === "horizontal" ? (
        <EllipsisVertical size={DefaultIconSize} />
      ) : (
        <Ellipsis size={DefaultIconSize} />
      )}
        <ArrayDivider direction={toolOptionsDirection} />
    </>
  );
}
export default ToolOptionHeaderComponent;
