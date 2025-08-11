import { Dialog } from "primereact/dialog";
import { X } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";

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
          </div>
        )}
      ></Dialog>
    </>
  );
}

export default InfoDialog;
