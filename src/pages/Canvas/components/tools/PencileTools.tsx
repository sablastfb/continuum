import CircleColorPicker from "../pickers/CircleColorPicker";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";
import { usePencileStore } from "../../data/store/PencileStore";
import CustomColorPicker from "../pickers/CustomColorPicker";

function PencileTools() {
  const pencileSettings = usePencileStore();
  const pencilColorId = usePencileStore().pencilColorId;
  const thicknesId = usePencileStore().thicknesId;
  const setPencileColor = usePencileStore((state) => state.setPencileColor);

  return (
    <>
      {pencileSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            thicknesId={id}
            selected={thicknesId === id}
            key={ix}
          />
        );
      })}
      {pencileSettings.allPencilColors.map((colorId, ix) => {
        return (
          <CircleColorPicker
            colorId={colorId}
            key={ix}
            selected={colorId === pencilColorId}
            action={() => setPencileColor({ colorId: colorId, color: "" })
            }
          />
        );
      })}
      <CustomColorPicker  customColorId='pencilCustomColor'  />
    </>
  );
}

export default PencileTools;
