import { Bookmark, Plus } from "lucide-react";
import { Continuum_Bookmark } from "../../features/service/Bookmark";
import { defaultIconSize } from "../../data/constants/CanvasConstants";
import { ConfirmPopup } from "primereact/confirmpopup";

function BookmakrComponent() {
  return (
    <>
    <ConfirmPopup  />

      <div onClick={() => Continuum_Bookmark.moveToLast()}>
        <Bookmark size={defaultIconSize} className="hover:cursor-pointer" />
      </div>
      <div onClick={() => Continuum_Bookmark.addBookmark()}>
        <Plus />
      </div>
    </>
  );
}

export default BookmakrComponent;
