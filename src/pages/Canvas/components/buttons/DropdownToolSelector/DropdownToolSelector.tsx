import { useState } from "react";
import ToolButton from "../ToolButton";
import { IconOption } from "../../../data/types/CanvasTypes";
import useCanvasStore from "../../../data/store/CanvasStore";
import { defaultCanvasBackground } from "../../../data/constants/CanvasConstants";
import DropdownYiBi from "./Dropdown";
import useSettingsStore from "../../../data/store/SettingsStore";

export type DropdownToolSelectorParams = {
  dropDownOptions: IconOption[];
};

function DropdownToolSelector({ dropDownOptions }: DropdownToolSelectorParams) {
  const toomButtonPos = useSettingsStore().layout.toolMenue;

  const [selectedDropDownOptions, setSelectedDropDownOptions] = useState(
    dropDownOptions[0]
  );
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const iconOptionTemplate = (option: IconOption) => {
    return (
      <div
        className={`flex  items-center cursor-pointer  rounded-xl  shadow-2xl p-2 ${defaultCanvasBackground}`}
      >
        {option.icon}
      </div>
    );
  };

  const selectedIconTemplate = (option: IconOption) => {
    if (option) {
      return (
        <>
            <ToolButton
              name={option.name}
              action={option.action}
              icon={option.icon}
            />
        </>
      );
    }
    return <span></span>;
  };

  return (
    <>
      <DropdownYiBi
       options={dropDownOptions}
       position={toomButtonPos} 
      ></DropdownYiBi>
    
      {/* <Dropdown
        panelClassName="tm-dropdown-panel left-aligned " // Added tm-dropdown-panel
        className="cursor-pointer"
        value={selectedDropDownOptions}
        valueTemplate={selectedIconTemplate}
        options={dropDownOptions}
        itemTemplate={iconOptionTemplate}
        optionLabel="name"
        dataKey="action"
        onChange={(e) => {
          setSelectedDropDownOptions(e.value);
          setActiveTool((e.value as IconOption).action);
        }}
      /> */}
    </>
  );
}

export default DropdownToolSelector;
