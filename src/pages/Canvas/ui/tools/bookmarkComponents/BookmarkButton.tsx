import { Bookmark } from "lucide-react";
import { DefaultIconSize } from "../../../../../constants/CanvasConstants";
import { useBookmark } from "../../../data/store/BookmarkStore";

const BookmarkButton = () => {
  const visible = useBookmark().containerVisible;
  const setVisible = useBookmark().setContainerVisible;

  return (
    <>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className="cursor-pointer"
      >
        <Bookmark
          size={DefaultIconSize}
          className={`${visible && `fill-amber-300`} `}
        />
      </div>
    </>
  );
}

export default BookmarkButton;
