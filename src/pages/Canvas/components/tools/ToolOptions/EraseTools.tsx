import { Circle, LineSquiggle } from "lucide-react";
import { useEraseStore } from "../../../data/store/EraseStore";
import { defaultOutlineColor } from "../../../data/constants/CanvasConstants";
import CircleThicknesPicker from "../../pickers/CircleThicknesPicker";
import ArrayDivider from "../../misc/ArrayDivider";
import { ThicknesPalet } from "../../../data/thicknes/ThickneContainer";

function EraseTools() {
  const eraseSettings = useEraseStore();
  const eraseMethod = useEraseStore().eraseMethod;
  const thicknesId = useEraseStore().thicknesId;
  const setEraseMode = useEraseStore().setEraseMode;
  const setEraseThickens = useEraseStore((state) => state.setEraseThickens);
  
  return (
    <>
      <LineSquiggle
        className={`rounded-full w-7 h-7 hover:cursor-pointer ${
          eraseMethod === "strong" ? defaultOutlineColor : ""
        }`}
        onClick={() => {
          setEraseMode("strong");
        }}
      />
      <Circle
        className={`rounded-full w-7 h-7 hover:cursor-pointer ${
          eraseMethod === "soft" ? defaultOutlineColor : ""
        }`}
        onClick={() => {
          setEraseMode("soft");
        }}
      />

      <ArrayDivider direction="vertical" />
      
      {eraseSettings.allEraseThicknes.map((id, ix) => {
        return (
          <CircleThicknesPicker
            action={() => {
              setEraseThickens({
                thicknes: ThicknesPalet.getThicknes(id),
                thicknesId: id,
              });
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
