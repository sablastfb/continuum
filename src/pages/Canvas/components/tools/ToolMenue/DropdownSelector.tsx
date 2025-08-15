import { useState } from "react";
import ToolButton from "./ToolButton";
import { defaultButtonsBackground } from "../../../data/constants/CanvasConstants";
import { ChevronDown } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";
import useSettingsStore from "../../../data/store/SettingsStore";
import { IconOption } from "../../../data/types/CanvasTypes";

function DropdownSelector({ options: options }: { options: IconOption[] }) {
  const position = useSettingsStore().layout.toolMenue;
  const [isOpen, setIsOpen] = useState(false);
  const setActiveTool = useCanvasStore((state) => state.setActiveTool);
  const [ix, setix] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`flex items-center gap-0  rounded-2xl
         ${position === "left" && "flex-col "}
         ${position === "right" && "flex-col "}
        `}
      >
        <ToolButton
          action={options[ix].action}
          icon={options[ix].icon}
        />
        <div
          className={`
            ${isOpen && "rotate-180"} ease-in-out transition-all duration-75`}
          onClick={toggleDropdown}
        >
          <div
            className={` 
            ${position === "left" && "rotate-270"}
            ${position === "right" && "rotate-90"}`}
          >
            <ChevronDown size={20} />
          </div>
        </div>
        <div
          className={`p-2 absolute gap-4  flex  -z-1  ease-in-out transition-all duration-75 
            ${position === "bottom" && "bottom-full flex-col "}
            ${position === "top" && "top-full flex-col "}
            ${position === "left" && "left-full"}
            ${position === "right" && "right-full"}
        `}
        >
          {isOpen &&
            options.map((element, ix) => (
              <div>
                <div
                  className={`h-full cursor-pointer rounded-2xl p-2 ${defaultButtonsBackground}`}
                  onClick={() => {
                    setActiveTool(element.action);
                    setix(ix);
                    setIsOpen(false);
                  }}
                >
                  {element.icon}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default DropdownSelector;
