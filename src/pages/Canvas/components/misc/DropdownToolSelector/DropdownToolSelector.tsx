import { Dropdown } from "primereact/dropdown";
import { IconOption } from "../../../data/ToolsMenueData";
import "./DropdownToolSelector.css";
import { useState } from "react";
import useCanvasStore from "../../../data/CanvasStore";

const iconOptionTemplate = (option: IconOption) => {
  return <div className="flex items-center">{option.icon}</div>;
};

const selectedIconTemplate = (option: IconOption) => {
  if (option) {
    return <div className="flex items-center">{option.icon}</div>;
  }
  return <span></span>;
};

export type DropdownToolSelectorParams = {
  dropDownOptions: IconOption[];
};

function DropdownToolSelector({ dropDownOptions }: DropdownToolSelectorParams) {
  const [selectedDropDownOptions, setSelectedDropDownOptions] = useState(dropDownOptions[0]);
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  return (
    <>
      <Dropdown
        className="hover:bg-amber-200"
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
      />
    </>
  );
}

export default DropdownToolSelector;
