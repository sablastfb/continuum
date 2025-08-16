import { Dialog } from "primereact/dialog";
import { X } from "lucide-react";
import useCanvasStore from "../../data/store/CanvasStore";
import { defaultDialogBacground } from "../../data/constants/CanvasConstants";

function ExportDialog() {
  const exportVisible = useCanvasStore((state) => state.exportVisible);
  const setExportVisible = useCanvasStore((state) => state.setExportVisible);

  return (
    <>
      <Dialog
        visible={exportVisible}
        className={`${defaultDialogBacground}`}
        onHide={() => {
          if (!exportVisible) return;
          setExportVisible(false);
        }}
        content={({ hide }) => (
          <div className="flex flex-col p-4 gap-2 h-fit w-full">
            <div className="flex justify-between">
              <div className="text-5xl ">Export</div>
              <div  className="hover:cursor-pointer" onClick={(e) => hide(e)}>
                <X size={32} />
              </div>
            </div>
          </div>
        )}
      ></Dialog>
    </>
  );
}

export default ExportDialog;
