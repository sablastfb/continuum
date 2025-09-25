import { Bookmark, Check, Plus, Trash, X } from "lucide-react";
import { Continuum_Bookmark } from "../../features/service/Bookmark";
import { defaultIconSize } from "../../data/constants/CanvasConstants";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { useBookmark } from "../../data/store/BookmarkStore";
import { divide } from "lodash";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function BookmakrComponent() {
  const [editingId, seteditingId] = useState<string | null>(null);
  const op = useRef(null);
  const bookmarks = useBookmark().bookmarks;
  return (
    <>
      <OverlayPanel ref={op} className="" showCloseIcon>
        <div className="cursor-pointer">
          <Plus
            size={defaultIconSize}
            onClick={() => Continuum_Bookmark.addBookmark()}
          />
        </div>
        {bookmarks.map((bookmark, i) => (
          <div
            className="flex"
            onClick={() => Continuum_Bookmark.moveToBookmark(bookmark)}
            onDoubleClick={() => seteditingId(bookmark.id)}
            onBlur={() => seteditingId(null)}
          >
            {editingId === bookmark.id && (
              <>
                <InputText
                  autoFocus
                  type="text"
                  className="p-inputtext-sm"
                  value={bookmark.name}
                />
                <Check />
                <X />
              </>
            )}
            {editingId !== bookmark.id && <div>{bookmark.name}</div>}
          </div>
        ))}
      </OverlayPanel>
      <div onClick={(e) => op.current.toggle(e)} className="cursor-pointer">
        <Bookmark size={defaultIconSize} />
      </div>
    </>
  );
}

export default BookmakrComponent;
