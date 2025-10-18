import {
  Camera,
  Lasso,
  MousePointer2,
  SquareDashed,
} from "lucide-react";
import {
  DefaultIconSize,
  DefaultOutline as DefaultOutlineSelection,
} from "../../../data/types/CanvasConstants";
import useToolStore from "../../../data/store/ToolStore";
import { SelectionToolType } from "../../../data/types/ToolTypes";
import { JSX } from "react";
import ToolOptionHeaderComponent from "../../toolBoxes/ToolOptionsHeaderComponent";

interface Par {
  icon: JSX.Element;
  toolType: SelectionToolType;
}

function SelectoinToolOptionsButton({ icon, toolType }: Par) {
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

function SelectoinToolQuickOptions() {
  return (
    <>
      <ToolOptionHeaderComponent />
      <SelectoinToolOptionsButton
        icon={<MousePointer2 size={DefaultIconSize} />}
        toolType={"pan-zoom"}
      />
      <SelectoinToolOptionsButton
        icon={<Lasso size={DefaultIconSize} />}
        toolType={"selection-lasso"}
      />
      <SelectoinToolOptionsButton
        icon={<SquareDashed size={DefaultIconSize} />}
        toolType={"selection-square"}
      />
      <SelectoinToolOptionsButton
        icon={<Camera size={DefaultIconSize} />}
        toolType={"screen-shot"}
      />
    </>
  );
}

export default SelectoinToolQuickOptions;
