import ZoomingButton from "../buttons/ZoomingButton";
import OptionButtons from "../buttons/OptionsButton";
import ToolsButtons from "../buttons/ToolsButtons";
import useCanvasStore from "../../data/store/CanvasStore";
function ToolsMenue() {
  const toolButtonPosition = useCanvasStore().canvasSettings.layout.toolButtons;

  return (
    <div
      className={`
        flex 
        justify-between
        p-2
        pointer-events-none
        ${toolButtonPosition === "top" && "top-0 left-0 right-0 items-start"}
        ${
          toolButtonPosition === "bottom" && "absolute bottom-0 left-0 right-0 items-start"
        }
           ${toolButtonPosition === "left" && "absolute bottom-0 top-0 left-0  flex-col items-start"}
           ${toolButtonPosition === "right" && "absolute bottom-0 top-0 right-0 items-end flex-col"}
        `}
    >
      <OptionButtons />
      <ToolsButtons />
      <ZoomingButton/>
    </div>
  );
}

export default ToolsMenue;
