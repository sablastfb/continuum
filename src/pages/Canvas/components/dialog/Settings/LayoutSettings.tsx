import { Dropdown } from "primereact/dropdown";
import useLayoutStore from "../../../data/store/LayoutStore";

function LayoutSettings() {
    const layoutStore = useLayoutStore();
  
  // const toolButtonPosition = useSettingsStore().layout.toolMenue;
  // const setLayoutToolsButton = useSettingsStore().setLayoutToolsMenue;

  // const toolMenue = useSettingsStore().layout.toolButtons;
  // const setLayoutToolsMenue = useSettingsStore().setLayoutToolsButton;
  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-xl  mb-4">Layout Settings</h3>
      <div>
        <h3> Tool button</h3>
        <div>
          <Dropdown
            value={layoutStore.toolMenuePosition}
            onChange={(e) => layoutStore.setLayoutOptions({toolMenuePosition: e.value})}
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
      <div>
        <h3> Tool menue</h3>
        <div>
          <Dropdown
            value={layoutStore.toolOptionsPosition}
             onChange={(e) => layoutStore.setLayoutOptions({toolOptionsPosition: e.value})}
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
    </div>
  );
}

export default LayoutSettings;
