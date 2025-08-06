import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import useCanvasStore from "../data/CanvasStore";

function SettingsDialog() {
  const settingVisible = useCanvasStore((state)=> state.settingVisible);
  const setSettingVisible = useCanvasStore((state) => state.setSettingVisible);

  return (
    <>
      <Dialog
        modal
        header="Settings"
        visible={settingVisible}
        className="h-[90vh] w-[50vw] bg-white/10 backdrop-blur-sm rounded-l-2xl p-2"
        onHide={() => {
          if (!settingVisible) return;
         setSettingVisible(false);
        }}
        content={({ hide }) => (
          <div className="flex flex-col p-4 gap-2 h-fit w-full">
            <div className="felx">
                <div className="text-5xl text-white ">
                Setings
                </div>
            </div>
            <div>
                xxx
            </div>
            <div className="flex justify-end">
                <Button label="Discard" icon="pi pi-times" onClick={(e) => hide(e)} className="p-button-text" />
                <Button label="Save" icon="pi pi-check" onClick={(e) => hide(e)} autoFocus />
            </div>
          </div>
        )}
      ></Dialog>
    </>
  );
}

export default SettingsDialog;
