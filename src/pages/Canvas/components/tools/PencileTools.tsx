import CircleColorPicker from "../pickers/CircleColorPicker";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";
import { usePencileStore } from "../../data/store/PencileStore";
import CustomColorPicker from "../pickers/CustomColorPicker";
import { ThicknesPalet } from "../../data/container/ThickneContainer";

function PencileTools() {
  const pencileSettings = usePencileStore();
  const pencilColorId = usePencileStore().pencilColorId;
  const thicknesId = usePencileStore().thicknesId;
  const setPencileColor = usePencileStore((state) => state.setPencileColor);
  const setPencileThickens = usePencileStore(
    (state) => state.setPencileThickens
  );

  return (
    <>
      {pencileSettings.allThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setPencileThickens({
                thicknes: ThicknesPalet.getThicknes(id),
                thicknesId: id,
              })
            }
           }
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
