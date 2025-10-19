import { Dropdown } from "primereact/dropdown";
import useLayoutStore from "../../../data/store/LayoutStore";
import { Checkbox } from "primereact/checkbox";
import useCanvasStore from "../../../data/store/CanvasStore";

const LayoutSettings = ()  => {
  const layoutStore = useLayoutStore();
  const canvasStore = useCanvasStore();

  return (
    <div className="p-4 flex flex-col gap-4">
      <h3 className="text-xl  mb-4">Layout Settings</h3>
        <div>
          <h3>Quic tools visible</h3>
          <Checkbox onChange={e => canvasStore.setQuickToolsVisibility(e.checked ?? true )} checked={canvasStore.qucikToolsActive}></Checkbox>
        </div>
      <div>
        <h3> Tool menue</h3>
        <div>
          <Dropdown
            value={layoutStore.toolMenuePosition}
            onChange={(e) =>
              layoutStore.setLayoutOptions({ toolMenuePosition: e.value })
            }
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
      <div>
        <h3> Tool option</h3>
        <div>
          <Dropdown
            value={layoutStore.toolOptionsPosition}
            onChange={(e) =>
              layoutStore.setLayoutOptions({ toolOptionsPosition: e.value })
            }
            options={["top", "bottom", "left", "right"]}
          />
        </div>
      </div>
    </div>
  );
}

export default LayoutSettings;
