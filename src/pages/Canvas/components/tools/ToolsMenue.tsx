import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { defaultCanvasBackground } from "../../data/constants/CanvasConstants";
import ZoomingButton from "../buttons/ZoomingButton";
import OptionButtons from "../buttons/OptionsButton";
import ToolsButtons from "../buttons/ToolsButtons";
function ToolsMenue() {
  const [toolsMenueVisible, setToolsMenueVisible] = useState<boolean>(false);

  return (
    <div className="flex">
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div
          className={`flex justify-center items-center ${defaultCanvasBackground} rounded-full p-1 absolute hover:cursor-pointer
          transition-all ease-in-out
            ${toolsMenueVisible ? "bottom-1" : "bottom-15"}
            `}
          onClick={() => {
            setToolsMenueVisible(!toolsMenueVisible);
          }}
        >
          <ArrowDown
            color="white"
            size={25}
            className={`transition-all ${
              toolsMenueVisible ? "rotate-180" : ""
            } `}
          />
        </div>
      </div>

      <div
        className={`
            absolute bottom-0 left-0 right-0 pointer-events-none
            ${
              toolsMenueVisible
                ? " translate-y-10 pointer-events-none hidden"
                : "  translate-y-0 opacity-100 "
            }
            `}
      >
        <ToolsButtons />
        <OptionButtons />
        <ZoomingButton />
      </div>
    </div>
  );
}

export default ToolsMenue;
