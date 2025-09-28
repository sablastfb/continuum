import { useState } from "react";
import ToolButton, { IconOption } from "../tools/HeaderToolMenue/ToolButton";
import { defaultButtonsBackground } from "../../data/constants/CanvasConstants";
import { ChevronDown } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";
import useSettingsStore from "../../data/store/BacgroundStore";

function DropdownToolSelector({ options }: { options: IconOption[] }) {
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const position = useSettingsStore().layout.toolMenue;

  const [isOpen, setIsOpen] = useState(false);
  const [ix, setix] = useState(0);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={`flex items-center gap-0 rounded-2xl relative
         ${position === "left" && "flex-col"}
         ${position === "right" && "flex-col"}
    `}>
      <ToolButton
        tool={options[ix].tool}
        icon={options[ix].icon}
      />
      <button
        className={`${isOpen && "rotate-180"} ease-in-out transition-all duration-75`}
        onClick={toggleDropdown}
      >
        <div className={`${position === "left" && "rotate-270"} ${position === "right" && "rotate-90"}`}>
          <ChevronDown size={20} />
        </div>
      </button>
      
      <div
        className={`p-2 absolute gap-2 flex bg-background rounded-lg shadow-lg
          ${position === "bottom" && "bottom-full flex-col mb-2"}
          ${position === "top" && "top-full flex-col mt-2"}
          ${position === "left" && "left-full flex-row ml-2"}
          ${position === "right" && "right-full flex-row mr-2"}
          ${!isOpen && "hidden"}
        `}
      >
        {options.map((element, index) => (
          <div
            key={index}
            className={`cursor-pointer rounded-2xl p-2 ${defaultButtonsBackground} hover:bg-opacity-80`}
            onClick={() => {
              setActiveTool(element.tool);
              setix(index);
              setIsOpen(false);
            }}
          >
            {element.icon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownToolSelector;
