import ExportDialog from "./ExportDialog";
import InfoDialog from "./InfoDialog";
import SettingsDialog from "./settingsDialogs/SettingsDialog/SettingsDialog";

const BarrelDialogs = () => {
  return (
    <>
      <SettingsDialog />
      <InfoDialog />
      <ExportDialog />
    </>
  );
}

export default BarrelDialogs;
