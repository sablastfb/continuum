import { Bookmark, Home, Plus, Trash, X } from "lucide-react";
import { Continuum_Bookmark } from "../../features/service/Bookmark";
import {
  defaultButtonsBackground,
  defaultIconSize,
} from "../../data/constants/CanvasConstants";
import { useState } from "react";
import { useBookmark } from "../../data/store/BookmarkStore";

function BookmakrComponent() {
  const [editingId, seteditingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const bookmarks = useBookmark().bookmarks;
  return (
    <>
      {visible && (
        <>
          <div
            className={`p-1 absolute left-0 top-20
              flex flex-col
              w-[250px]
              max-h-[200px]
              gap-2
            rounded-md ${defaultButtonsBackground}`}
          >
            <div className="flex justify-start gap-5 border-b-2  ">
              <div className="text-xl font-bold text-amber-300">Bookmakrs</div>
              <div className="cursor-pointer  rounded-full">
                <Plus
                  size={25}
                  onClick={() => Continuum_Bookmark.addBookmark()}
                />
              </div>
              <div className="cursor-pointer  rounded-full">
                <Home
                  size={25}
                  onClick={() => Continuum_Bookmark.moveToBookmarkHome()}
                />
              </div>
              <div className="cursor-pointer  rounded-full">
                <X size={25} onClick={() => setVisible(!visible)} />
              </div>
            </div>
            <div className="overflow-auto flex flex-col ">
              {bookmarks.length === 0 && (
                <div className="flex justify-center font-bold text-amber-200 ">
                  Add bookmark
                </div>
              )}
              {bookmarks.map((bookmark, ix) => (
                <div
                  key={bookmark.id}
                  className={`flex w-full cursor-pointer border-stone-500  ${
                    ix !== bookmarks.length - 1 && "border-b-1"
                  }`}
                  onClick={() => {
                    Continuum_Bookmark.moveToBookmark(bookmark);
                    setSelectedId(bookmark.id);
                  }}
                  onDoubleClick={() => seteditingId(bookmark.id)}
                  onBlur={() => seteditingId(null)}
                >
                  {editingId === bookmark.id && (
                    <div
                      className={`flex flex-row justify-start gap-5 text-right`}
                    >
                      <input
                        autoFocus
                        type="text"
                        className="p-inputtext-sm" // Keep your existing styling class
                        value={bookmark.name}
                        onChange={(e) => {
                          Continuum_Bookmark.renameBookmark(
                            bookmark.id,
                            e.target.value
                          );
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            seteditingId(null);
                          }
                        }}
                      />
                    </div>
                  )}
                  {editingId !== bookmark.id && (
                    <div
                      className={`flex flex-row justify-between items-center px-2 w-full text-right`}
                    >
                      <div
                        className={`text-center select-none  ${
                          selectedId === bookmark.id && `text-amber-200`
                        }`}
                      >
                        {bookmark.name}
                      </div>
                      <div className="cursor-pointer flex justify-center">
                        {bookmark.id === selectedId && (
                          <Trash
                            className=" hover:fill-amber-900"
                            size={20}
                            onClick={() => {
                              if (selectedId) {
                                Continuum_Bookmark.removeBookmark(selectedId);
                                setSelectedId(null);
                              }
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className="cursor-pointer"
      >
        <Bookmark
          size={defaultIconSize}
          className={`${visible && `fill-amber-300`} `}
        />
      </div>
    </>
  );
}

export default BookmakrComponent;
