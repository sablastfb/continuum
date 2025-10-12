import ExportDialog from "./ExportDialog";
import InfoDialog from "./InfoDialog";
import SettingsDialog from "./Settings/SettingsDialog/SettingsDialog";

function CanvasDialogs() {
  return (
    <>
      <SettingsDialog />
      <InfoDialog />
      <ExportDialog />
    </>
  );
}

export default CanvasDialogs;
