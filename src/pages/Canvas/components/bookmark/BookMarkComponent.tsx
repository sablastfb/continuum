import { Bookmark, Check, Home, Plus, Trash, X } from "lucide-react";
import { Continuum_Bookmark } from "../../features/service/Bookmark";
import { defaultIconSize } from "../../data/constants/CanvasConstants";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState } from "react";
import { useBookmark } from "../../data/store/BookmarkStore";
import { InputText } from "primereact/inputtext";

function BookmakrComponent() {
  const [editingId, seteditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const op = useRef<OverlayPanel>(null);
  const bookmarks = useBookmark().bookmarks;
  return (
    <>
      <OverlayPanel ref={op} className="" showCloseIcon>
        <div className="flex">
          <div className="cursor-pointer bg-green-300 dark:bg-green-500 rounded-full">
            <Plus
              size={defaultIconSize}
              onClick={() => Continuum_Bookmark.addBookmark()}
            />
          </div>
          <div className="cursor-pointer bg-green-300 dark:bg-green-500 rounded-full">
            <Home
              size={defaultIconSize}
              onClick={() => Continuum_Bookmark.moveToBookmarkId("home")}
            />
          </div>
          <div className="cursor-pointer bg-green-300 dark:bg-green-500 rounded-full">
            <Trash
              size={defaultIconSize}
              onClick={() => {
                if (selectedId) {
                  Continuum_Bookmark.removeBookmark(selectedId);
                  setSelectedId(null);
                }
              }}
            />
          </div>
        </div>
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex"
            onClick={() => {
              Continuum_Bookmark.moveToBookmark(bookmark);
              setSelectedId(bookmark.id);
            }}
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
                  onChange={(e) => {
                    Continuum_Bookmark.renameBookmark(
                      bookmark.id,
                      e.target.value
                    );
                  }}
                />
                <Check />
                <X />
              </>
            )}
            {editingId !== bookmark.id && (
              <div className={`${bookmark.id === selectedId && "outline-1"} `}>
                {bookmark.name}
              </div>
            )}
          </div>
        ))}
      </OverlayPanel>
      <div
        onClick={(e) => {
          op.current!.toggle(e);
        }}
        className="cursor-pointer"
      >
        <Bookmark size={defaultIconSize} />
      </div>
    </>
  );
}

export default BookmakrComponent;
