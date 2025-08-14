import { Dropdown } from "primereact/dropdown";
import useSettingsStore from "../../../data/store/SettingsStore";

function LayoutSettings() {
  const toolButtonPosition = useSettingsStore().layout.toolMenue;
  const setLayoutToolsButton = useSettingsStore().setLayoutToolsMenue;

  const toolMenue = useSettingsStore().layout.toolButtons;
  const setLayoutToolsMenue = useSettingsStore().setLayoutToolsButton;
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-xl  mb-4">Layout Settings</h3>
      <div>
        <h3> Tool button</h3>
        <div>
          <Dropdown
            value={toolButtonPosition}
            onChange={(e) => setLayoutToolsButton(e.value)}
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
      <div>
        <h3> Tool menue</h3>
        <div>
          <Dropdown
            value={toolMenue}
            onChange={(e) => setLayoutToolsMenue(e.value)}
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
    </div>
  );
}

export default LayoutSettings;
