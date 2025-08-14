import { JSX, useState } from "react";
import "./Dropdown.scss";
import { IconOption, LayoutPositon } from "../../../data/types/CanvasTypes";
import ToolButton from "../ToolButton";
import {
  defaultBackgroundColor,
  defaultCanvasBackground,
} from "../../../data/constants/CanvasConstants";
import { ArrowUp, ChevronDown } from "lucide-react";
import useCanvasStore from "../../../data/store/CanvasStore";

function DropdownYiBi({
  options: options,
  position,
}: {
  options: IconOption[];
  position: LayoutPositon;
}) {
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
          name={options[ix].name}
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
                  className={`h-full cursor-pointer rounded-2xl p-2 ${defaultCanvasBackground}`}
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

export default DropdownYiBi;
