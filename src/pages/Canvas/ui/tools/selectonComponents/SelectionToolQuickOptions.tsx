import {
  Camera,
  Lasso,
  MousePointer2,
  SquareDashed,
} from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../../../constants/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { SelectionToolType } from "../../../data/types/ToolTypes";
import { JSX } from "react";
import ToolOptionHeaderComponent from "../../components/ToolOptionsHeaderComponent";

interface Par {
  icon: JSX.Element;
  toolType: SelectionToolType;
}

const SelectionToolOptionsButton = ({ icon, toolType }: Par) => {
  const setActiveTool = useToolStore((state) => state.setActiveTool);
  const setLastSelectionTool = useToolStore(
    (state) => state.setLastSelectionTool
  );
  const activeTool = useToolStore().activeTool;
  return (
    <>
      <div
        className={`cursor-pointer  ${
          activeTool === toolType && DefaultOutlineSelection
        }`}
        onClick={() => {
          setActiveTool(toolType);
          setLastSelectionTool(toolType);
        }}
      >
        {icon}
      </div>
    </>
  );
}

function SelectionToolQuickOptions() {
  return (
    <>
      <ToolOptionHeaderComponent />
      <SelectionToolOptionsButton
        icon={<MousePointer2 size={DefaultIconSize} />}
        toolType={"pan-zoom"}
      />
      <SelectionToolOptionsButton
        icon={<Lasso size={DefaultIconSize} />}
        toolType={"selection-lasso"}
      />
      <SelectionToolOptionsButton
        icon={<SquareDashed size={DefaultIconSize} />}
        toolType={"selection-square"}
      />
      <SelectionToolOptionsButton
        icon={<Camera size={DefaultIconSize} />}
        toolType={"screen-shot"}
      />
    </>
  );
}

export default SelectionToolQuickOptions;
