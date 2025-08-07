import { Dialog } from "primereact/dialog";
import useCanvasStore from "../../data/CanvasStore";
import { Button } from "primereact/button";
import { X } from "lucide-react";

function InfoDialog() {
  const infoVisible = useCanvasStore((state) => state.infoVisible);
  const setInfoVisible = useCanvasStore((state) => state.setInfoVisible);

  return (
    <>
      <Dialog
        modal
        header="Info"
        visible={infoVisible}
        className="h-[90vh] w-[50vw] bg-white/10 backdrop-blur-sm rounded-l-2xl p-2"
        onHide={() => {
          if (!infoVisible) return;
          setInfoVisible(false);
        }}
        content={({ hide }) => (
          <div className="flex flex-col p-4 gap-2 h-fit w-full">
            <div className="flex justify-between">
              <div className="text-5xl text-white ">Info</div>
              <div  className="hover:cursor-pointer" onClick={(e) => hide(e)}>
                <X size={32} color="white"/>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                label="Discard"
                icon="pi pi-times"
                onClick={(e) => hide(e)}
                className="p-button-text"
              />
              <Button
                label="Save"
                icon="pi pi-check"
                onClick={(e) => hide(e)}
                autoFocus
              />
            </div>
          </div>
        )}
      ></Dialog>
    </>
  );
}

export default InfoDialog;
