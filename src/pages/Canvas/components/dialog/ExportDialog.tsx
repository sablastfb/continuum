import { Dialog } from "primereact/dialog";
import useCanvasStore from "../../data/CanvasStore";
import { X } from "lucide-react";

function ExportDialog() {
  const exportVisible = useCanvasStore((state) => state.exportVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);

  return (
    <>
      <Dialog
        visible={exportVisible}
        className="h-[90vh] w-[50vw] bg-white/10 backdrop-blur-sm rounded-l-2xl p-2"
        onHide={() => {
          if (!exportVisible) return;
          setExportVisible(false);
        }}
        content={({ hide }) => (
          <div className="flex flex-col p-4 gap-2 h-fit w-full">
            <div className="flex justify-between">
              <div className="text-5xl text-white ">Export</div>
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

export default ExportDialog;
