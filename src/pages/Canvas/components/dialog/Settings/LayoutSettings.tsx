import { Dropdown } from "primereact/dropdown";
import useCanvasStore from "../../../data/store/CanvasStore";

function LayoutSettings() {
  const toolButtonPosition = useCanvasStore().canvasSettings.layout.toolButtons;
  const setLayoutToolsButton = useCanvasStore().setLayoutToolsButton;

  const toolMenue = useCanvasStore().canvasSettings.layout.toolMenue;
  const setLayoutToolsMenue = useCanvasStore().setLayoutToolsMenue;
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-xl  mb-4">Layout Settings</h3>
      <div>
        <h3> Tool button</h3>
        <div>
          <Dropdown value={toolButtonPosition} onChange={(e) => setLayoutToolsButton(e.value)} options={ ["top", "bottom", "left", "right"]}/>
        </div>
      </div>
      <div>
        <h3> Tool menue</h3>
        <div>
          <Dropdown value={toolMenue} onChange={(e) => setLayoutToolsMenue(e.value)} options={ ["top", "bottom", "left", "right"]}/>
        </div>
      </div>
    </div>
  );
}

export default LayoutSettings;
