import { ThicknesPalet } from "../../data/container/ThickneContainer";
import { useEraseStore } from "../../data/store/EraseStore";
import CircleThicknesPicker from "../pickers/CircleThicknesPicker";

function EraseTools() {

  const eraseSettings = useEraseStore();
  const thicknesId = useEraseStore().thicknesId;
  const setEraseThickens = useEraseStore(
    (state) => state.setEraseThickens
  );
  return (
    <>
     {eraseSettings.allEraseThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
          action={() => {
            setEraseThickens({
              thicknes: ThicknesPalet.getThicknes(id),
              thicknesId: id,
            })
          }}
            thicknesId={id}
            selected={thicknesId === id}
            key={ix}
          />
        );
      })}
    </>
  );
}

export default EraseTools;
