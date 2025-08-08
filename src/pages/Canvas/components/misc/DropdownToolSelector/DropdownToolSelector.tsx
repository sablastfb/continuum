import { Dropdown } from "primereact/dropdown";
import { IconOption } from "../../../data/ToolsMenueData";
import "./DropdownToolSelector.css";
import { useState } from "react";
import useCanvasStore from "../../../data/CanvasStore";

export type DropdownToolSelectorParams = {
  dropDownOptions: IconOption[];
};

function DropdownToolSelector({ dropDownOptions }: DropdownToolSelectorParams) {
  const [selectedDropDownOptions, setSelectedDropDownOptions] = useState(
    dropDownOptions[0]
  );
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const iconOptionTemplate = (option: IconOption) => {
    return <div className="flex items-center cursor-pointer">{option.icon}</div>;
  };

  const selectedIconTemplate = (option: IconOption) => {
    if (option) {
      return (
        <div
          className="flex items-center hover:cursor-pointer"
          onClick={() => {
            setActiveTool(selectedDropDownOptions.action);
          }}
        >
          {option.icon}
        </div>
      );
    }
    return <span></span>;
  };

  return (
    <>
      <Dropdown
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
          debugger;
        }}
      />
    </>
  );
}

export default DropdownToolSelector;
