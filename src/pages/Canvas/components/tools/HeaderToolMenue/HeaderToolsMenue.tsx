import ZoomingButton from "./ZoomingButton";
import OptionButtons from "./OptionsButton";
import ToolsMenue from "./ToolsMenue";
import useSettingsStore from "../../../data/store/BacgroundStore";
import ToolOptions from "./ToolOptions";
function HeaderToolsMenue() {
  const toolButtonPosition = useSettingsStore().layout.toolMenue;

  return (
    <div
      className={`
        absolute
        flex 
        flex-wrap
        justify-around
        xl:justify-between
        p-2
        pointer-events-none
        ${toolButtonPosition === "top" && "top-0 left-0 right-0 items-start"}
        ${
          toolButtonPosition === "bottom" &&
          " bottom-0 left-0 right-0 items-start"
        }
           ${
             toolButtonPosition === "left" &&
             " bottom-0 top-0 left-0  flex-col items-start"
           }
           ${
             toolButtonPosition === "right" &&
             "absolute bottom-0 top-0 right-0 items-end flex-col"
           }
        `}
    >
      <OptionButtons />
      <div className="hidden sm:flex   items-center justify-center align-middle gap-1.5   flex-wrap">
        <ToolsMenue />
      </div>

      <ZoomingButton />
    </div>
  );
}

export default HeaderToolsMenue;
