import CircleColorPicker from "../pickers/CircleColorPicker";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";
import { usePencileStore } from "../../data/store/PencileStore";
import CustomColorPicker from "../pickers/CustomColorPicker";
import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { useMarkerStore } from "../../data/store/MarkerStore";

function MarkerTools() {
  const pencileSettings = useMarkerStore();
  const pencilColorId = useMarkerStore().markerColorId;
  const thicknesId = useMarkerStore().thicknesId;
  const setPencileColor = useMarkerStore((state) => state.setMarkereColor);
  const setPencileThickens = useMarkerStore(
    (state) => state.setmarkereThickens
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
      {pencileSettings.allmarkerColors.map((colorId, ix) => {
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

export default MarkerTools;
