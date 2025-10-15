import ExportDialog from "./ExportDialog";
import InfoDialog from "./InfoDialog";
import SettingsDialog from "./Settings/SettingsDialog/SettingsDialog";

function BarrelDialogs() {
  return (
    <>
      <SettingsDialog />
      <InfoDialog />
      <ExportDialog />
    </>
  );
}

export default BarrelDialogs;
