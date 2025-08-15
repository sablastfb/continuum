import { usePencileStore } from "../../../data/store/PencileStore";
import CircleColorPicker from "../../pickers/CircleColorPicker";

function DrawingSettings() {
  const pencileSettings = usePencileStore();

  return (
    <div className="p-4">
      <h3 className="text-xl mb-4">Pencil Settings</h3>
      <div className="flex gap-4">
        {pencileSettings.allPencilColors.map((color, ix) => {
          return (
            <CircleColorPicker colorId={color} selected={false} key={ix} action={()=>{}}/>
          );
        })}
      </div>
    </div>
  );
}

export default DrawingSettings;
