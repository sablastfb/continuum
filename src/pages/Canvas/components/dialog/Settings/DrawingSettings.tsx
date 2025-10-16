import { usePenStore } from "../../../data/store/PenStore";
import CircleColorPicker from "../../pickers/CircleColorPicker";

function DrawingSettings() {
  const penSettings = usePenStore();

  return (
    <div className="p-4">
      <h3 className="text-xl mb-4">Pencil Settings</h3>
      <div className="flex gap-4">
        {penSettings.allPencilColors.map((color, ix) => {
          return (
            <CircleColorPicker colorId={color} selected={false} key={ix} action={()=>{}}/>
          );
        })}
      </div>
    </div>
  );
}

export default DrawingSettings;
