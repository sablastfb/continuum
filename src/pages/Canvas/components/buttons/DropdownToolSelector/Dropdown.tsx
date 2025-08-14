import { JSX, useState } from "react";
import "./Dropdown.scss";
import { IconOption, LayoutPositon } from "../../../data/types/CanvasTypes";
import ToolButton from "../ToolButton";
import {
  defaultBackgroundColor,
  defaultCanvasBackground,
} from "../../../data/constants/CanvasConstants";
import { ArrowUp, ChevronDown } from "lucide-react";

function DropdownYiBi({
  options: options,
  position,
}: {
  options: IconOption[];
  position: LayoutPositon;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`flex items-center gap-0 
         ${position === "left" && "flex-col "}
         ${position === "right" && "flex-col "}
        `}
      >
        <ToolButton
          name={options[0].name}
          action={options[0].action}
          icon={options[0].icon}
        />
        <div
          className={`${
            isOpen && "rotate-180"
          } ease-in-out transition-all duration-75`}
          onClick={toggleDropdown}
        >
          <div className="rotate-270">
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
            options.map((element) => (
              <div className={` rounded-2xl p-2 ${defaultCanvasBackground}`}>
                {element.icon}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default DropdownYiBi;
