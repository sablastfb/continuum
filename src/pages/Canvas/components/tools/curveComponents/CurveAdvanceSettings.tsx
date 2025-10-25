import { Checkbox } from "primereact/checkbox";
import { useState } from "react";

const CurveAdvanceSettings = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-2">
      <div className="flex gap-5">
        <Checkbox inputId="zoom"
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
        ></Checkbox>
        <label htmlFor="zoom">Zoom</label>
      </div>
    </div>
  );
};

export default CurveAdvanceSettings;
